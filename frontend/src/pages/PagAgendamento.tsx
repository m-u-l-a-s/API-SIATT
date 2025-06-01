import { useEffect, useState } from "react";
import ButtonAdd from "../components/ButtonAdd";
import MeetingDetail from "../components/MeetingDetail";
import SearchInput from "../components/SearchInput";
import { Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { authService } from "../services/services.auth";
import { IUsuario } from "../interfaces/usuario";
import separaDataHora from "../control/utils";
import { Categoria } from "./FormularioReuniao";

type Meeting = {
    id: string,
    titulo: string,
    dataHora: string,
    duracao: number,
    categoria: Categoria,
    pauta: string,
    participantes: string[],
    solicitanteId: string,
    salaPresencialId: string,
    joinUrl: string | null,
    AtaUrl: string | null,
    login: string,
    senha: string,
    zoomMeetingId: string | null | undefined
};

const PagAgendamento = () => {
    const [reunioesAgendadas, setReunioesAgendadas] = useState<Meeting[]>([]);
    const [reunioesPassadas, setReunioesPassadas] = useState<Meeting[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [usuario, setUsuario] = useState<IUsuario>();
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const auth = useAuth()
    // const [activeButton, setActiveButton] = useState<string>('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await api.get(`usuario/email/${authService.decodificarToken(auth?.token)}`);
                console.log(user)
                if (user.status !== 200) {
                    auth?.logout();
                    throw new Error("Não foi possível autenticar usuário")
                }
                setUsuario(user.data);
            } catch (error) {
                console.log(`Erro: ${error}`);
            }

            try {
                await api.get(`reuniao/${authService.decodificarToken(auth?.token)}`)
                    .then(resp => {
                        if (resp.status !== 200) {
                            throw new Error("Não foi possível buscar os dados.");
                        }
                        const reunioesData: Meeting[] = resp.data;

                        const dataAtual = new Date()
                        // const dataMesPassado = new Date(dataAtual.setDate(dataAtual.getDate() - 30))

                        const reuniaoVindo = reunioesData.filter(reuniao => {
                            console.log(reuniao)
                            return new Date(reuniao.dataHora) > dataAtual
                        })

                        const reunioesPassadas = reunioesData.filter(reuniao => {
                            return (new Date(reuniao.dataHora) < dataAtual)
                        })

                        setReunioesAgendadas(reuniaoVindo);
                        setReunioesPassadas(reunioesPassadas)
                    })
            } catch (error) {
                console.error("Erro: ", error);
            }
        };
        reunioesDetails = reunioesAgendadas.map(reuniao => {
            const dataHoraArray = separaDataHora(reuniao.dataHora);
            if (dataHoraArray != null) {
                const data = dataHoraArray[0];
                const hora = dataHoraArray[1];
                return { ...reuniao, data, hora };
            }
            return { ...reuniao, data: '0', hora: '0' };
        });

        // Filtrar reuniões baseado no conteúdo do SearchInput:
        reunioesAgendadasFiltradas = reunioesDetails.filter(reuniao =>
            reuniao.titulo.toLowerCase().includes(searchQuery.toLowerCase())
        );
        fetchData();
    }, []);

    let reunioesDetails = reunioesAgendadas.map(reuniao => {
        const dataHoraArray = separaDataHora(reuniao.dataHora);
        if (dataHoraArray != null) {
            const data = dataHoraArray[0];
            const hora = dataHoraArray[1];
            return { ...reuniao, data, hora };
        }
        return { ...reuniao, data: '0', hora: '0' };
    });

    // Filtrar reuniões baseado no conteúdo do SearchInput:
    let reunioesAgendadasFiltradas = reunioesDetails.filter(reuniao =>
        reuniao.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const handleFilterClick = (filterType: string) => {
    //     setActiveButton(filterType);
    //     // You can apply additional logic here based on the filter type
    // };

    return (
        <div className="">
            <div className="conteudo flex flex-col md:flex-row fill-current">
                <div className="coluna-1 md:w-3/3 md:order-1 h-screen p-4 sm:w-screen flex flex-col mb-10">
                    <div className="sub-coluna-1 flex justify-between m-2">
                        <div className="mr-2 flex align-middle">
                            <SearchInput setSearchQuery={setSearchQuery} />
                            <Link to="/Home/Agendamento">
                                <ButtonAdd />
                            </Link>
                        </div>
                    </div>
                    {reunioesAgendadasFiltradas.map((reuniao) => (
                        (<MeetingDetail
                            zoomMeetingId={reuniao.zoomMeetingId}
                            key={reuniao.id}
                            id={reuniao.id}
                            pauta={reuniao.pauta}
                            titulo={reuniao.titulo}
                            date={reuniao.data}
                            time={reuniao.hora}
                            duracao={reuniao.duracao}
                            participantes={reuniao.participantes}
                            categoria={reuniao.categoria}
                            salaPresencial={reuniao.salaPresencialId}
                            joinUrl={reuniao.joinUrl}
                            idSolicitante={reuniao.solicitanteId}
                            idUsuario={usuario?.id}
                            AtaUrl={reuniao.AtaUrl}
                        />)
                    )
                    )
                    }

                    <div className="mt-6 ">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center p-2 font-medium text-lg"
                        >
                            Reuniões Passadas
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isOpen && (
                            <div className="mt-3 space-y-4">
                                {reunioesPassadas.map((reuniao) => {
                                    let dataHoraArray = separaDataHora(reuniao.dataHora);
                                    if (dataHoraArray == null) {
                                        dataHoraArray = ["00", "00"];
                                    }

                                    return (
                                        <MeetingDetail
                                            zoomMeetingId={reuniao.id}
                                            key={reuniao.id}
                                            id={reuniao.id}
                                            pauta={reuniao.pauta}
                                            titulo={reuniao.titulo}
                                            date={dataHoraArray[0]}
                                            time={dataHoraArray[1]}
                                            duracao={reuniao.duracao}
                                            participantes={reuniao.participantes}
                                            categoria={reuniao.categoria}
                                            salaPresencial={reuniao.salaPresencialId}
                                            joinUrl={reuniao.joinUrl}
                                            idSolicitante={reuniao.solicitanteId}
                                            idUsuario={usuario?.id}
                                            AtaUrl={reuniao.AtaUrl}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagAgendamento;

