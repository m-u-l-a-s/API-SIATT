import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
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
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';


// type Meeting = {
//     id: string,
//     titulo: string,
//     dataHora: string,
//     duracao: number,
//     categoria: string,
//     pauta: string,
//     participantes: string[],
//     solicitanteId: string,
//     salaPresencialId: string,
//     salaVirtualId: string | null,
// };

export enum Categoria {
    VIRTUAL = "virtual",
    PRESENCIAL = "fisica",
    HIBRIDA = "hibrida"
}

export interface CreateReuniao {
    titulo: string | undefined
    categoria: Categoria | undefined
    dataHora: Date | undefined
    duracao: number | undefined
    pauta: string | undefined
    presencial: string | undefined
    virtual: string | undefined
    solicitanteEmail: string | undefined
    participantes: any | undefined
}
export interface SalaVirtual {
    id: string
    identificacao: string
    login: string
    senha: string
    permissao: number
}

export interface SalaPresencial {
    id: string
    identificacao: string
    permissao: number
    ocupacaoMax: number
    local: string
}

interface FileWithId {
    id: string;
    file: File;
  }

export function FormularioReuniao() {
    const [alertModal, setAlertModal] = useState(false);
    const [modalCadastro, setModalCadastro] = useState(false);

    const navigate = useNavigate()

    const [form, setForm] = useState(Categoria.PRESENCIAL);
    const [emailInput, setEmailInput] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);

    const [salaOnline, setSalaOnline] = useState<SalaVirtual[]>([]);
    const [salaPresencial, setSalaPresencial] = useState<SalaPresencial[]>([]);
    const [salaPresencialFiltrada, setSalaPresencialFiltrada] = useState<SalaPresencial[]>([]);

    const [salaOnlineSelecionada, setSalaOnlineSelecionada] = useState<string>('');
    const [salaPresencialSelecionada, setSalaPresencialSelecionada] = useState<string>('');

    const [horaDuracao, setHoraDuracao] = useState<number>(0);
    const [minDuracao, setMinDuracao] = useState<number>(0);

    const [dataCalendarioCombo, setDataCalendarioCombo] = useState<string>();
    const [horaInicial, setHoraInicial] = useState<number>(0);
    const [minInicial, setMinInicial] = useState<number>(0);

    const [files, setFiles] = useState<FileWithId[]>([]);
    
    const auth = useAuth();

    //useEffect - popular combos

    useEffect(() => {
        getSalaOnline();
        getSalaPresencial();
    }, [])

    //Rota para popular combo sala online

    const getSalaOnline = async () => {

        api.get(`sala-virtual`).then(resp => {
            if (resp.status !== 200) {
                throw new Error('Erro ao realizar a requisição');
            }
            return resp.data
        }).then(data => {
            setSalaOnline(data);
        }).catch(error => {
            console.error("Ocorreu um erro", error)
        })
    }

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

    //Criação do formulário - função p/salvar no banco
    type FormValues = {
        titulo: string,
        categoria: Categoria,
        data: Date,
        hora: string,
        duracao: number,
        pauta: string,
        presencial: string,
        virtual: string,
        email: string[],
    }

    const [formValues, setFormValues] = useState<FormValues>({
        titulo: '',
        categoria: Categoria.PRESENCIAL,
        data: new Date,
        hora: '',
        duracao: 0,
        pauta: '',
        presencial: '',
        virtual: '',
        email: [],
    });

    function adicionaZero(numero : number){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }

    function formatarData(dataAtual:Date): string {
        return (adicionaZero(dataAtual.getDate()).toString() + "/" + (adicionaZero(dataAtual.getMonth()+1)).toString() + "/" + dataAtual.getFullYear());
    }

    const findReuniao = (id : string ) => {
        let salaSelecionada = salaPresencial.filter( sala => {
            if (sala.id == id){
                return sala.identificacao
            }
        })
        return salaSelecionada[0].identificacao;
    }

    const sendEmail = async () => {
        let dataFormatada = formatarData(formValues.data)
        let identificacaoSala = findReuniao(salaPresencialSelecionada)
        let bodyRequest : IBodyEmail= {
            emails : emails,
            data : dataFormatada,
            hora : `${horaInicial}:${minInicial}`,
            duracao : `${horaDuracao}:${minDuracao}`,
            pauta : `${formValues.pauta}`,
            titulo : formValues.titulo,
            categoria : form,
            sala : identificacaoSala,
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
    //Função p/salvar as mudanças no formulário
    const handleChangeForm = (key: keyof FormValues, value: any) => {
        setFormValues({ ...formValues, [key]: value })
    }

    //função p/salvar os email no formulário
    // const handleChangeFormEmail = () => {
    //     handleChangeForm('email', emails);
    // }

    const saveForm = () => {
        switch (form) {
            case Categoria.PRESENCIAL:
                setSalaOnlineSelecionada('');
                break;
            case Categoria.VIRTUAL:
                setSalaPresencialSelecionada('');
                break;
            default:
                break;
        }

        if (dataCalendarioCombo === undefined) {
            return "A data da reunião é obrigatória!"
        }

        let dataReuniao = new Date(dataCalendarioCombo)
        dataReuniao.setHours(horaInicial - 3)
        dataReuniao.setMinutes(minInicial)

        const reuniao : CreateReuniao=
        {
            titulo: formValues.titulo,
            categoria: form,
            dataHora: new Date(dataReuniao.toISOString()),
            duracao: ((60 * Number(horaDuracao)) + Number(minDuracao)),
            pauta: formValues.pauta,
            presencial: salaPresencialSelecionada,
            virtual: salaOnlineSelecionada,
            solicitanteEmail: authService.decodificarToken(authService.getToken()),
            participantes: emails
        }

        try {
            api.post("reuniao/agendar", reuniao).then(resp => {
                console.log(resp)
                const idReuniao = resp.data.id;
                for (let anexo of files) {
                    const formData = new FormData;
                    formData.append("file",anexo.file)
                    formData.append("reuniaoId",idReuniao)

                    try {
                        api.post(`reuniao-anexos/upload/${authService.decodificarToken(auth?.token)}`,formData);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }).then(() => setAlertModal(true))
        } catch (error) {
            console.log("Erro: "+error)
        }
        sendEmail();
        setModalCadastro(false);
        navigate('/');
    }

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

    const sugestaoSala= (e: any) => {
        const nConvidados = e.target.value

        const salasFiltradas = salaPresencial.filter((sala) => {
            return sala.ocupacaoMax >= nConvidados 
        })

        if (salasFiltradas.length < 1) {
            setSalaPresencialFiltrada([{id: '',identificacao:'Não há nenhuma sala disponível' , local:'',ocupacaoMax: 0, permissao:0 }])
        } else {
            setSalaPresencialFiltrada(salasFiltradas)
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
                                <div className="flex items-start space-x-4">
                                    <label
                                        htmlFor="dataReuniao">Data:</label>
                                    <CalendarPicker dataCallBack={setDataCalendarioCombo} date={null} /> {/* CHAMANDO DATA PICKER?  */}
                                </div>

                                <div className="ml-4">
                                    <label
                                        htmlFor="horarioReuniao"
                                        className="pr-4">Hora:</label>
                                    <TimeChoser horaCallBack={setHoraInicial} minCallBack={setMinInicial} horaInicial={"00"} minutoInicial={"00"} />
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">

                                <label
                                    htmlFor="tempoDuracao">Duração:</label>
                                <TimeChoser horaCallBack={setHoraDuracao} minCallBack={setMinDuracao} horaInicial={"00"} minutoInicial={"00"} />

                            </div>


                            <div className="flex items-start space-x-2">
                                <label>Título da Reunião:</label>
                                <input
                                    className="border  border-gray-300 rounded-lg px-3  w-96 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                                    type="text"
                                    id="tituloReuniao" name="tituloReuniao"
                                    onChange={e => { handleChangeForm('titulo', e.target.value) }} />
                            </div>


                            <div className="flex items-start">
                                <label>Pauta:</label>
                            </div>

                            <div className="flex items-start">
                                <textarea
                                    className="border  border-gray-300 rounded-lg px-3 py-2 w-full h-20 

                            focus:outline-none focus:border-gray-500 focus:ring-gray-400"
                                    id="pautaReuniao" name="pautaReuniao"
                                    onChange={e => { handleChangeForm('pauta', e.target.value) }} />
                            </div>

                            <div className="flex">
                                <UploadFiles file={files} setFile={setFiles}/>
                            </div>
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
                                    <GrAdd/>
                                </button>

                            </div>

                            <ListaEmails emails={emails} setEmails={setEmails} />

                            {(form === Categoria.PRESENCIAL || form === Categoria.HIBRIDA) && (
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

                            {(form === Categoria.VIRTUAL || form === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label> Sala Online:</label>
                                    <select onChange={e => { setSalaOnlineSelecionada(e.target.value) }} name="salas" id="salas" className="text-center border  border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                        {/* popular combo online */}
                                        <option value="">Sala Online</option>
                                        {salaOnline.sort((a, b) => {
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
                                        })}
                                    </select>
                                </div>
                            )}

                            {(form === Categoria.PRESENCIAL || form === Categoria.HIBRIDA) && (
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
                            )}
                        </div>

                    </div>

                    <div>
                        <div className="flex mb-2 items-center justify-between mt-9 text-black font-medium px-56  -space-x-">


                            <button
                                type="button"
                                className="rounded-lg bg-primary border-gray-500 py-4 px-20 font-sans text-xs font-bold uppercase 
                             shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                            >
                                Limpar Campos
                            </button>

                            <button
                                type="button"
                                className="rounded-lg bg-primary py-4 px-20 font-sans text-xs font-bold uppercase 
                                shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                                focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                                onClick={() => setModalCadastro(true)}
                            >
                                Agendar
                            </button>

                            {modalCadastro && (
                                <ConfirmationModal
                                confirmText="Sim"
                                cancelText="Cancelar"
                                message="Tem certeza que deseja agendar a reunião?"
                                onCancel={() => setModalCadastro(false)}
                                onConfirm={saveForm} />
                            )}


                        </div>
                    </div>


                </form>

            </div>
        </>
    )
}