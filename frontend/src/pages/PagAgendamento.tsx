import { useEffect, useState } from "react";
import ButtonAdd from "../components/ButtonAdd";
import MeetingDetail from "../components/MeetingDetail";
import SearchInput from "../components/SearchInput";
import { Link } from "react-router-dom";
import separaDataHora from "../control/utils";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import { authService } from "../services/services.auth";
import { IUsuario } from "../interfaces/usuario";

type Meeting = {
    id: string,
    titulo: string,
    dataHora: string,
    duracao: number,
    categoria: string,
    pauta: string,
    participantes: string[],
    solicitanteId: string,
    salaPresencialId: string,
    joinUrl: string | null,
    login: string;
    senha: string;
};

const PagAgendamento = () => {
    const [reunioesAgendadas, setReunioesAgendadas] = useState<Meeting[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [usuario, setUsuario] = useState<IUsuario>();
    const auth = useAuth()
    // const [activeButton, setActiveButton] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await api.get(`usuario/email/${authService.decodificarToken(auth?.token)}`);
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
                        console.log(reunioesData)
                        setReunioesAgendadas(reunioesData);
                    })
            } catch (error) {
                console.error("Erro: ", error);
            }
        };

        fetchData();
    }, []);

    const reunioesDetails = reunioesAgendadas.map(reuniao => {
        const dataHoraArray = separaDataHora(reuniao.dataHora);
        if (dataHoraArray != null) {
            const data = dataHoraArray[0];
            const hora = dataHoraArray[1];
            return { ...reuniao, data, hora };
        }
        return { ...reuniao, data: '0', hora: '0' };
    });

    // Filtrar reuniões baseado no conteúdo do SearchInput:
    const filteredReunioes = reunioesDetails.filter(reuniao =>
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
                        {/* <h2 className="text-fonteVermelha text-3xl flex flex-initial">
                            <a
                                className={`text-fonteVermelha p-4 hover:cursor-pointer hover:bg-gray-200 rounded-lg
                                 ${activeButton === 'mensal' && 'bg-gray-100 font-semibold' }`}
                                onClick={() => handleFilterClick('mensal')}
                            >
                                Mensal
                            </a>
                            <a
                                className={`text-fonteVermelha p-4 hover:cursor-pointer hover:bg-gray-200 rounded-lg
                                ${activeButton === 'criadoPorMim' && 'bg-gray-100 font-semibold'}`}
                                onClick={() => handleFilterClick('criadoPorMim')}
                            >
                                Criado por mim
                            </a>
                        </h2> */}
                        <div className="mr-2 flex align-middle">
                            <SearchInput setSearchQuery={setSearchQuery} />
                            <Link to="/Home/Agendamento">
                                <ButtonAdd />
                            </Link>
                        </div>
                    </div>
                    {filteredReunioes.map((reuniao) => (
                        <MeetingDetail
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PagAgendamento;

