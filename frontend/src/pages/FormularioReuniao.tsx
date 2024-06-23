import { useEffect, useState } from "react";
import CalendarPicker from "../components/DateCalendar";
import ListaEmails from "../components/ListaEmails";
import TimeChoser from "../components/TimeChoser";
import { Tabs } from "../components/Tabs";
import InformationModal from "../components/InformationModal";
import api from "../services/api";
import { authService } from "../services/services.auth";
import { IBodyEmail } from "../interfaces/IBodyEmail";
import UploadFiles from "../components/uploadfiles";
import useAuth from "../hooks/useAuth";
import { TextField } from "../components/TextInput";
import { TextArea } from "../components/TextArea";
import { InputListField } from "../components/InputListField";
import { SalaPresencial } from "../interfaces/ISalaPresencial";
import { CreateReuniao } from "../interfaces/CreateReuniaoDto";
import { Categoria } from "../interfaces/CreateReuniaoDto";
import ButtonCriarReuniao from "../components/ButtonCriarReuniao";
import { ZoomMeetingDto } from "../interfaces/ZoomMeetingDto";
import axios from "axios";

interface FileWithId {
    id: string;
    file: File;
}

export function FormularioReuniao() {
    const [dataCalendarioCombo, setDataCalendarioCombo] = useState<string>();
    const [horaInicial, setHoraInicial] = useState<number>(0);
    const [minInicial, setMinInicial] = useState<number>(0);
    const [horaDuracao, setHoraDuracao] = useState<number>(0);
    const [minDuracao, setMinDuracao] = useState<number>(0);

    const [titulo, setTitulo] = useState<string>("")
    const [pauta, setPauta] = useState<string>("")
    const [numConvidados, setNumConvidados] = useState<number>(0)
    const [files, setFiles] = useState<FileWithId[]>([]);
    const [emailInput, setEmailInput] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);
    const [form, setForm] = useState(Categoria.PRESENCIAL);
    const [salaPresencial, setSalaPresencial] = useState<SalaPresencial[]>([]);
    const [salaPresencialFiltrada, setSalaPresencialFiltrada] = useState<SalaPresencial[]>([]);
    const [salaPresencialSelecionada, setSalaPresencialSelecionada] = useState<string>('');
    const [alertModal, setAlertModal] = useState<boolean>(false);

    const auth = useAuth();

    const clientID = 'zt6lhdUVTteosZ9p7x_NA'
    const redirectUri = encodeURIComponent('http://localhost:5173/zoom')
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;

    //useEffect - popular combos

    useEffect(() => {
        getSalaPresencial();
    }, [])

    //Rota para popular combo sala online


    const getSalaPresencial = async () => {

        api.get(`sala-presencial`).then(resp => {
            if (resp.status !== 200) {
                throw new Error('Erro ao realizar a requisição');
            }
            return resp.data
        }).then(data => {
            setSalaPresencial(data);
            setSalaPresencialFiltrada(data);
        }).catch(error => {
            console.error("Ocorreu um erro", error)
        })
    }

    function adicionaZero(numero: number) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    function formatarData(dataAtual: Date): string {
        return (adicionaZero(dataAtual.getDate()).toString() + "/" + (adicionaZero(dataAtual.getMonth() + 1)).toString() + "/" + dataAtual.getFullYear());
    }

    const getDataCombo = (): Date => {
        try {
            if (dataCalendarioCombo) {
                let dataReuniao = new Date(dataCalendarioCombo)
                dataReuniao.setHours(horaInicial - 3)
                dataReuniao.setMinutes(minInicial)
                return dataReuniao
            }
            throw new Error("Campo data deve ser preenchido!")
        } catch (error) {
            throw new Error("Erro retornar data");

        }
    }

    const findReuniao = (id: string) => {
        let salaSelecionada = salaPresencial.filter(sala => {
            if (sala.id == id) {
                return sala.identificacao
            }
        })
        return salaSelecionada[0].identificacao;
    }

    const sendEmail = async () => {
        let identificacaoSala = findReuniao(salaPresencialSelecionada)
        let bodyRequest: IBodyEmail = {
            emails: emails,
            data: formatarData(getDataCombo()),
            hora: `${horaInicial}:${minInicial}`,
            duracao: `${horaDuracao}:${minDuracao}`,
            pauta: `${pauta}`,
            titulo: titulo,
            categoria: form,
            sala: identificacaoSala,
        }
        console.log(bodyRequest)

        try {
            await api.post("sendEmail", bodyRequest).then(resp => {
                console.log(resp)
            }).catch(erro => {
                console.log(erro)
            })
        } catch (error) {
            console.log(`Erro: ${error}`)
        }
    }
    const saveForm = (join_url ?: string) => {

        const solicitanteEmail = authService.decodificarToken(authService.getToken());
        if (!solicitanteEmail) {
            console.log("Email do solicitante não existe!")
            return
        }

        const dataReuniao = getDataCombo()

        if (form == Categoria.VIRTUAL) {
            setSalaPresencialSelecionada("")
        }

        const reuniao: CreateReuniao =
        {
            titulo: titulo,
            categoria: form,
            dataHora: dataReuniao,
            duracao: ((60 * Number(horaDuracao)) + Number(minDuracao)),
            pauta: pauta,
            salapresencial: salaPresencialSelecionada,
            solicitanteEmail: solicitanteEmail,
            participantes: emails,
            joinUrl: join_url
        }

        try {
            api.post("reuniao/agendar", reuniao).then(async resp => {
                console.log(resp)
                const idReuniao = resp.data.id;
                await salvarArquivos(idReuniao)

            }).then(() => setAlertModal(true))
        } catch (error) {
            console.log("Erro: " + error)
        }

        sendEmail();
    }
    const salvarArquivos = (idReuniao: string) => {
        for (let anexo of files) {
            const formData = new FormData;
            formData.append("file", anexo.file)
            formData.append("reuniaoId", idReuniao)

            try {
                api.post(`reuniao-anexos/upload/${authService.decodificarToken(auth?.token)}`, formData);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleAddEmail = (event: any) => {
        event.preventDefault();
        console.log(event.message)
        if (emailInput.trim() !== '') {
            console.log(emailInput)
            setEmails([...emails, emailInput]);
            setEmailInput('');
        }
    };

    const sugestaoSala = () => {
        const salasFiltradas = salaPresencial.filter((sala) => {
            return sala.ocupacaoMax >= numConvidados
        })

        if (salasFiltradas.length < 1) {
            setSalaPresencialFiltrada([{ id: '', identificacao: 'Não há nenhuma sala disponível', local: '', ocupacaoMax: 0, permissao: 0 }])
        } else {
            setSalaPresencialFiltrada(salasFiltradas)
        }
    }


    const autenticarUsuario = () => {
        const authTab = window.open(zoomAuthUrl, '_blank', 'width=500,height=600');

        const handleMessage = (event: MessageEvent) => {
            if (event.data[0] === 'authenticated') {
                authTab?.close()
                authService.setZoomToken(event.data[1].access_token)
                auth?.setZoomToken(event.data[1].access_token)
                window.removeEventListener('message', handleMessage)
                AgendarReuniaoZoom()
            }
        }

        window?.addEventListener('message', handleMessage)
    }

    const AgendarReuniaoZoom = async () => {
        try {
            if (form == Categoria.HIBRIDA || form == Categoria.VIRTUAL) {
                if (dataCalendarioCombo) {
                    const zoomMeeting: ZoomMeetingDto = {
                        topic: titulo,
                        agenda: pauta,
                        start_time: getDataCombo().toISOString(),
                        duration: ((60 * Number(horaDuracao)) + Number(minDuracao)),
                        meeting_invites: emails
                    }
                    await axios.post("http://localhost:3000/zoom/schedule", zoomMeeting,
                        {
                            headers: {
                                Authorization: `Bearer ${authService.getZoomToken()}`
                            }
                        }
                    ).then(resp => {
                        saveForm(resp.data.join_url)
                    }).catch(error => {
                        console.error(error)
                    })
                }
            }
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <>
            <Tabs state={form} setState={setForm} />

            <div className="flex items-start justify-center mt-4 font-medium">

                <form action="" className="justify-center space-x-40">

                    <div className="flex  justify-center space-x-40" >

                        <div className="space-y-5 ">

                            <div className="flex justify-between">
                                <CalendarPicker dataCallBack={setDataCalendarioCombo} date={null} />
                                <div className="ml-4">
                                    <label className="pr-4">Hora:</label>
                                    <TimeChoser horaCallBack={setHoraInicial} minCallBack={setMinInicial} horaInicial={"00"} minutoInicial={"00"} />
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">
                                <label
                                    htmlFor="tempoDuracao">Duração:</label>
                                <TimeChoser horaCallBack={setHoraDuracao} minCallBack={setMinDuracao} horaInicial={"00"} minutoInicial={"00"} />
                            </div>


                            <div className="flex items-start space-x-2">
                                <TextField nome="Título da Reunião" value={titulo} setValue={setTitulo} />
                            </div>

                            <TextArea nome="Pauta:" value={pauta} setValue={setPauta} />

                            <div className="flex">
                                <UploadFiles file={files} setFile={setFiles} />
                            </div>
                        </div>

                        {/* SEGUNDA COLUNA DO FORMULARIO */}

                        <div className="space-y-7 ml-10">
                            <InputListField name="E-mail do convidados" inputValue={emailInput} setInputValue={setEmailInput} pushList={handleAddEmail} />

                            <ListaEmails emails={emails} setEmails={setEmails} />

                            {(form === Categoria.PRESENCIAL || form === Categoria.HIBRIDA) && (
                                <>
                                    <div className="flex items-start space-x-2">
                                        <label htmlFor="">Número de Convidados:</label>
                                        <input
                                            onChange={async (e) => {
                                                await setNumConvidados(parseInt(e.target.value))
                                                sugestaoSala()
                                            }
                                            }
                                            type="number"
                                            id="nConvidados" name="nConvidados"
                                            className="text-center border  border-gray-300 rounded-lg w-72 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                        </input>
                                    </div>

                                    <div className="flex items-start">
                                        <label>Escolha sua sala:</label>
                                    </div>


                                    <div className="flex items-start space-x-2">
                                        <label >Sala Presencial:</label>

                                        <select onChange={e => setSalaPresencialSelecionada(e.target.value)} name="cars" id="cars" className="text-center border  border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                            {/* popular combo presencial */}
                                            <option value="">Sala Presencial</option>
                                            {salaPresencialFiltrada.sort((a, b) => {
                                                const nomeA = a.identificacao.toUpperCase(); // convertendo para maiúsculas para garantir uma comparação sem distinção de maiúsculas/minúsculas
                                                const nomeB = b.identificacao.toUpperCase();

                                                if (nomeA < nomeB) {
                                                    return -1;
                                                }
                                                if (nomeA > nomeB) {
                                                    return 1;
                                                }
                                                return 0; // os nomes são iguais
                                            }).map(sala => {
                                                return (
                                                    <option value={sala.id}>
                                                        {sala.identificacao}
                                                    </option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {alertModal && (
                        <InformationModal message={"Reunião Agendada com sucesso"} confirmText={"Ok"} onConfirm={() => window.location.href = '/'} />
                    )}
                </form>

            </div>

            {form == Categoria.PRESENCIAL && (
                <div>
                    <div className="items-center text-black font-medium ">
                        <ButtonCriarReuniao CriarReuniao={saveForm} />
                    </div>
                </div>
            )}

            {form == Categoria.VIRTUAL && (
                <div>
                    <div className="items-center text-black font-medium ">
                        <a target="_blank" className="rounded-lg bg-primary py-4 px-20 font-sans text-xs font-bold uppercase 
                    shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={autenticarUsuario}>Agendar</a>
                    </div>
                </div>
            )}


            {form == Categoria.HIBRIDA && (
                <div>
                    <div className="items-center text-black font-medium ">
                        <a target="_blank" className="rounded-lg bg-primary py-4 px-20 font-sans text-xs font-bold uppercase 
                        shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={autenticarUsuario}>Agendar</a>
                    </div>
                </div>
            )}
        </>
    )
}

export { Categoria };
