import { useState, useEffect } from "react";
import { TabsAdmin } from "../components/TabsAdmin";
import api from "../services/api";
import UserDetails from "../components/UserDetails";
import SalaDetails from "../components/SalaDetails";
import MeetingDetail from "../components/MeetingDetail"; // Import the MeetingDetail component
import { authService } from "../services/services.auth";
import useAuth from "../hooks/useAuth";
import separaDataHora from "../control/utils";
import { IUsuario } from "../interfaces/usuario";

export enum Tipo {
    USUARIO = "usuario",
    SALA = "sala",
    REUNIAO = "reuniao"
}

const ListarCadastrados = () => {
    const [currentTab, setCurrentTab] = useState<Tipo>(Tipo.USUARIO);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [salas, setSalas] = useState<{ presencial: any[] }>({ presencial: [] });
    const [reunioes, setReunioes] = useState<any[]>([]);
    const [usuario, setUsuario] = useState<IUsuario | undefined>();
    const auth = useAuth();

    useEffect(() => {
        fetchUsuario();
        getUsuarios();
        getSalas();
        getReunioes();
    }, []);

    const fetchUsuario = async () => {
        try {
            const user = await api.get(`usuario/email/${authService.decodificarToken(auth?.token)}`);
            if (user.status !== 200) {
                auth?.logout();
                throw new Error("Não foi possível autenticar usuário");
            }
            const userData: IUsuario = user.data;
            setUsuario(userData);
            console.log(usuario)
        } catch (error) {
            console.log(`Erro: ${error}`);
        }
    };

    const getUsuarios = async () => {
        try {
            const resp = await api.get(`usuario`);
            if (resp.status !== 200) {
                throw new Error('Erro ao realizar a requisição');
            }
            setUsuarios(resp.data);
        } catch (error) {
            console.error("Ocorreu um erro", error);
        }
    };

    const getSalas = async () => {
        try {
            const [presencialResponse] = await Promise.all([
                api.get(`sala-presencial`),
            ]);

            if (presencialResponse.status !== 200) {
                throw new Error("Erro ao realizar a requisição!");
            }

            const data = {
                presencial: presencialResponse.data,
            };

            console.log(data)
            setSalas(data);
        } catch (error) {
            console.error("Ocorreu um erro", error);
        }
    };

    const getReunioes = async () => {
        try {
            const resp = await api.get(`reuniao`);
            if (resp.status !== 200) {
                throw new Error('Erro ao realizar a requisição');
            }
            const reunioesData = resp.data.map((reuniao: any) => {
                const dataHoraArray = separaDataHora(reuniao.dataHora);
                if (dataHoraArray) {
                    const [data, hora] = dataHoraArray;
                    return { ...reuniao, data, hora };
                }
                return { ...reuniao, data: '0', hora: '0' };
            });
            setReunioes(reunioesData);
        } catch (error) {
            console.error("Ocorreu um erro", error);
        }
    };

    return (
        <>
            <TabsAdmin state={currentTab} setState={setCurrentTab} />
            {currentTab === Tipo.USUARIO && (
                <div>
                    {usuarios.map((usuario) => (
                        <UserDetails
                            key={usuario.id}
                            id={usuario.id}
                            login={usuario.login}
                            email={usuario.email}
                            departamento={usuario.departamento}
                            permissao={usuario.permissao}
                            status={usuario.status}
                            admin={usuario.admin}
                        />
                    ))}
                </div>
            )}
            {currentTab === Tipo.SALA && (
                <div>
                    <h2 className="font-bold p-2">Salas Presenciais</h2>
                    {salas.presencial.map((sala) => (
                        <SalaDetails
                            key={sala.id}
                            id={sala.id}
                            identificacao={sala.identificacao}
                            endereco={sala.endereco}
                            permissao={sala.permissao}
                            ocupacaoMax={sala.ocupacaoMax}
                            local={sala.local}
                        />
                    ))}
                </div>
            )}
            {currentTab === Tipo.REUNIAO && (
                <div>
                    {reunioes.map((reuniao) => (
                        <MeetingDetail
                            key={reuniao.id}
                            id={reuniao.id}
                            titulo={reuniao.titulo}
                            pauta={reuniao.pauta}
                            date={reuniao.data}
                            time={reuniao.hora}
                            duracao={reuniao.duracao}
                            participantes={reuniao.participantes}
                            categoria={reuniao.categoria}
                            idSolicitante={reuniao.solicitanteId}
                            idUsuario={usuario?.id}
                            salaPresencial={reuniao.salaPresencialId ? `Presencial - sala ${reuniao.salaPresencialId}` : ''}
                            AtaUrl={reuniao.AtaUrl} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ListarCadastrados;
