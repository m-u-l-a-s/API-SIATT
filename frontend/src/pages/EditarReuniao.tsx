import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import CalendarPicker from "../components/DateCalendar";
import ListaEmails from "../components/ListaEmails";
import TimeChoser from "../components/TimeChoser";
import InformationModal from "../components/InformationModal";
import api from "../services/api";
import { authService } from "../services/services.auth";
import { useLocation } from "react-router-dom";
import { Categoria } from "../interfaces/CreateReuniaoDto";
import { SalaPresencial } from "../interfaces/ISalaPresencial";
import { MeetingDetailProps } from "../interfaces/MeetingDetails";
import { CreateReuniaoDto } from "../types/formularioReuniao";
import axios, { AxiosRequestConfig } from "axios";
import { getZoomClientId, getZoomRedirectUrl } from "../variables";



export function EditarReuniao() {
    const { state } = useLocation() as { state: MeetingDetailProps };

    const [alertModal, setAlertModal] = useState(false);
    const [categoria] = useState<Categoria>(state.categoria);
    const [emailInput, setEmailInput] = useState<string>('');
    const [emails, setEmails] = useState<string[]>(state.participantes);
    const [titulo, setTitulo] = useState<string>(state.titulo);
    const [pauta, setPauta] = useState<string>(state.pauta);

    const [horaInicial, setHoraInicial] = useState<number>(parseInt(state.time.split(":")[0]));
    const [minInicial, setMinInicial] = useState<number>(parseInt(state.time.split(":")[1]));
    const [horaDuracao, setHoraDuracao] = useState<number>(state.duracao / 60);
    const [minDuracao, setMinDuracao] = useState<number>(state.duracao % 60);

    const [salaPresencial, setSalaPresencial] = useState<SalaPresencial[]>([]);
    const [salaPresencialFiltrada, setSalaPresencialFiltrada] = useState<SalaPresencial[]>([]);
    const [salaPresencialSelecionada, setSalaPresencialSelecionada] = useState<string>("");
    const [dataCalendarioCombo, setDataCalendarioCombo] = useState<string>(new Date(state.date).toISOString());

    const ZOOM_CLIENT_ID = getZoomClientId()
    const ZOOM_REDIRECT_URI = encodeURIComponent(getZoomRedirectUrl())
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URI}`;


    //useEffect - popular combos
    const getDataReuniao = (): Date => {
        return new Date(dataCalendarioCombo);
    }

    useEffect(() => {

        getSalaPresencial();

        if (state.salaPresencial) {
            setSalaPresencialSelecionada(state.salaPresencial)
        }
    }, []);


    // Rota para popular combo sala presencial

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

    // const sendEmail = async () => {
    //     let dataFormatada = formatarData(formValues.data)
    //     let identificacaoSala = findReuniao(salaPresencialSelecionada)
    //     let bodyRequest: IBodyEmail = {
    //         emails: emails,
    //         data: dataFormatada,
    //         hora: `${horaInicial}:${minInicial}`,
    //         duracao: `${horaDuracao}:${minDuracao}`,
    //         pauta: `${formValues.pauta}`,
    //         titulo: formValues.titulo,
    //         categoria: categoria,
    //         sala: identificacaoSala,
    //     }
    //     console.log(bodyRequest)

    //     try {
    //         await api.post("sendEmail", bodyRequest).then(resp => {
    //             console.log(resp)
    //         }).catch(erro => {
    //             console.log(erro)
    //         })
    //     } catch (error) {
    //         console.log(`Erro: ${error}`)
    //     }
    // }
 
    const handleInputChange = (e: any) => {
        setEmailInput(e.target.value);
    };

    const handleAddEmail = (event: any) => {
        event.preventDefault();
        console.log(event.message)
        if (emailInput.trim() !== '') {
            console.log(emailInput)
            setEmails([...emails, emailInput]);
            setEmailInput('');
        }
    };


    const sugestaoSala = (e: any) => {
        const nConvidados = e.target.value

        const salasFiltradas = salaPresencial.filter((sala) => {
            return sala.ocupacaoMax >= nConvidados
        })

        if (salasFiltradas.length < 1) {
            setSalaPresencialFiltrada([{ id: '', identificacao: 'Não há nenhuma sala disponível', local: '', ocupacaoMax: 0, permissao: 0 }])
        } else {
            setSalaPresencialFiltrada(salasFiltradas)
        }
    }

    const saveForm = async (id: string) => {
        if (categoria == Categoria.HIBRIDA || categoria == Categoria.VIRTUAL) {
            const token = authService.getZoomToken()
            if ((token == null || token == "")) {
                autenticarUsuario(id)
                return
            }

            if (authService.isTokenExpired(token)) {
                console.log("Token expirado")
                autenticarUsuario(id)
                return
            }
        }



        const dataHoraReuniao = new Date(dataCalendarioCombo)
        dataHoraReuniao.setHours(horaInicial - 3)
        dataHoraReuniao.setMinutes(minInicial) 

        let zoomMeetingId : number | undefined = undefined
        let ataUrl : string = "", joinUrl : string = ""

        if (state.zoomMeetingId) {
            zoomMeetingId = parseInt(state.zoomMeetingId)
        }
        if (state.AtaUrl) {
            ataUrl = state.AtaUrl
        }
        if (state.joinUrl) {
            joinUrl = state.joinUrl
        }


        const bodyRequest : CreateReuniaoDto = {
            categoria: categoria,
            dataHora: dataHoraReuniao,
            duracao: minDuracao + (horaDuracao *60),
            participantes: emails,
            pauta: pauta,
            solicitanteEmail: authService.getToken(),
            titulo: titulo,
            zommMeetingId: zoomMeetingId,
            AtaUrl: ataUrl,
            joinUrl: joinUrl,
            presencial: salaPresencialSelecionada,
        } 

        console.log(bodyRequest)

        const options : AxiosRequestConfig = {
            url : `http://localhost:3000/reuniao/${id}`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authService.getZoomToken()}`,
            },
            data: bodyRequest
        }

        const resp = await axios.request(options)
        if (resp.status != 204 && resp.status != 200) {
            console.log(resp.data)
        }

        setAlertModal(true)
    }

    const autenticarUsuario = (id: string) => {
        const authTab = window.open(zoomAuthUrl, '_blank', 'width=500,height=600');

        const handleMessage = (event: MessageEvent) => {
            if (event.data[0] === 'authenticated') {
                const accessToken = event.data[1].access_token
                authTab?.close()
                authService.setZoomToken(accessToken)
                window.removeEventListener('message', handleMessage)
                saveForm(id)
            }
        }
        window?.addEventListener('message', handleMessage)
    }


    return (
        <>


            <div className="flex items-start justify-center mt-4 font-medium">

                <form action="" className="justify-center space-x-40 ">

                    <div className="flex  justify-center space-x-40" >

                        <div className="space-y-5 ">

                            <div className="flex justify-between">
                                <div className="flex items-start space-x-4">
                                    <label
                                        htmlFor="dataReuniao"></label>
                                    <CalendarPicker dataCallBack={setDataCalendarioCombo}
                                        date={getDataReuniao()} />

                                </div>

                                <div className="ml-4">
                                    <label
                                        htmlFor="horarioReuniao"
                                        className="pr-4">Hora:</label>
                                    <TimeChoser horaCallBack={setHoraInicial} minCallBack={setMinInicial}
                                        horaInicial={`${horaInicial}`} minutoInicial={`${minInicial}`} />
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">

                                <label
                                    htmlFor="tempoDuracao">Duração:</label>
                                <TimeChoser horaCallBack={setHoraDuracao} minCallBack={setMinDuracao}
                                    horaInicial={`${horaDuracao}`} minutoInicial={`${minDuracao}`} />

                            </div>


                            <div className="flex items-start space-x-2">
                                <label>Título da Reunião:</label>
                                <input
                                    className="border  border-gray-300 rounded-lg px-3  w-96 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                                    type="text"
                                    id="tituloReuniao" name="tituloReuniao"
                                    value={titulo}
                                    onChange={(e) => {
                                        setTitulo(e.target.value);
                                    }} />
                            </div>


                            <div className="flex items-start">
                                <label>Pauta:</label>
                            </div>

                            <div className="flex items-start">
                                <textarea
                                    className="border  border-gray-300 rounded-lg px-3 py-2 w-full h-20 

                            focus:outline-none focus:border-gray-500 focus:ring-gray-400"
                                    id="pautaReuniao" name="pautaReuniao"
                                    value={pauta}
                                    onChange={e => {
                                        setPauta(e.target.value);
                                    }} />
                            </div>
                            {/* 
                            <div className="flex items-start space-x-2">

                                <button className="flex items-center justify-center border 
                            border-gray-300 rounded-lg px-3 py-2 w-full h-10 focus:outline-none
                            focus:border-gray-500 focus:ring-gray-400"
                                    type="button" id="botaoAnexo" name="botaoAnexo">

                                    <GrAttachment className="mr-2" />
                                    Anexar documento

                                </button>
                            </div> */}

                        </div>

                        {/* SEGUNDA COLUNA DO FORMULARIO */}

                        <div className="space-y-7 ml-10">

                            <div className="flex items-start space-x-2" >
                                <label htmlFor=""> E-mail dos convidados: </label>
                                <input
                                    placeholder="exemplo@exemplo.com"
                                    className="border  border-gray-300 rounded-lg px-3 w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                                    type="text"
                                    value={emailInput}
                                    onChange={handleInputChange}
                                />

                                <button
                                    onClick={handleAddEmail}
                                    className="flex items-center justify-center align-middle border border-gray-300 font-bold 
                                     w-8 h-8 rounded-full cursor-pointer hover:bg-gray-100"
                                >
                                    <GrAdd />
                                </button>

                            </div>

                            <ListaEmails emails={emails} setEmails={setEmails} />

                            {(categoria === Categoria.PRESENCIAL || categoria === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label htmlFor="">Número de Convidados:</label>
                                    <input
                                        onChange={(e) => sugestaoSala(e)}
                                        type="number"
                                        id="nConvidados" name="nConvidados"
                                        className="text-center border  border-gray-300 rounded-lg w-72 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                    </input>
                                </div>
                            )}

                            <div className="flex items-start">
                                <label>Escolha sua sala</label>
                            </div>

                            {(categoria === Categoria.PRESENCIAL || categoria === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label >Sala Presencial:</label>
                                    <select value={salaPresencialSelecionada} onChange={e => setSalaPresencialSelecionada(e.target.value)} name="cars" id="cars" className="text-center border  border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                        {/* popular combo presencial */}
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
                            )}
                        </div>

                    </div>

                    <div>
                        <div className="flex  items-center justify-between mt-9 text-black font-medium px-56  -space-x-">


                            <button
                                type="button"
                                className="rounded-lg bg-primary py-4 px-20 font-sans text-xs font-bold uppercase 
                         shadow-md shadow-pink-500/20 transition-all hover:shadow-lg 
                            hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                            active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => saveForm(state.id)}
                            >
                                Salvar alterações
                            </button>

                            {alertModal && (
                                <InformationModal message={"Reunião Atualizada com sucesso"} confirmText={"Ok"} onConfirm={() => window.location.href = '/'} />
                            )}
                        </div>
                    </div>


                </form>

            </div>
        </>
    )
}