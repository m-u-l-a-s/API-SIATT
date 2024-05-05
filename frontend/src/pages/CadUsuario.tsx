import { useState } from "react";
import { api_url } from "../variables";
import { MdDelete } from "react-icons/md";
import InformationModal from "../components/InformationModal";
import api from "../services/api";


interface Usuario {
    login: string;
    email: string;
    departamento: string;
    permissao: Number;
    senha: string;
    status: 1;
    admin: boolean;
}




const CadUsuario = () => {
    const [alertModal, setAlertModal] = useState(false)
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [departamento, setDepartamento] = useState<string>('');
    const [permissao, setPermissao] = useState<string>('');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [admin, setAdmin] = useState<boolean | undefined>(undefined)

    const [departamentos, setDepartamentos] = useState<string[]>(['financeiro', 'comercial', 'tecnico', "administrativo"]);

    const handleAdicionarUsuario = (event: any) => {
        if (permissao == undefined) {
            throw new Error("Permissao vazia")
        }
        event.preventDefault();
        const novoUsuario: Usuario = { login, email, senha, departamento, permissao: Number(permissao), status: 1, admin: Boolean(admin) };
        setUsuarios([...usuarios, novoUsuario]);

    };

    const DelUsuarioLista = (index: number, e: any) => {
        e.preventDefault()
        const updateUsuarios = usuarios.filter((_, i) => i !== index)
        console.log(updateUsuarios)
        setUsuarios(updateUsuarios)

    }


    const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAdmin(e.target.value === 'true');
        if (e.target.value === 'true') {
            setPermissao('3');
        } else {
            setPermissao('');
        }
    };

    const handleCadastrarUsuarios = async () => {
        // Implemente a lógica para enviar os usuários cadastrados para o backend
        usuarios.forEach(async usuario => {
            await api.post("usuario", usuario)
                .then(resp => {
                    if (resp.status !== 201) {
                        console.log(resp)
                        throw new Error("Seu Cadastro não foi realizado!")
                    }

                })
                .then(() => setAlertModal(true))
        })
        console.log('Usuários cadastrados:', usuarios);
    };

    return (

        <div className="flex items-start justify-center mt-4 space-x-52 text-black font-medium">

            <div>

                <form className=" space-y-4">



                    <div className="space-x-3">
                        <label>Nome:</label>
                        <input className="bordaInput items-center w-72 h-auto"
                            type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </div>

                    <div className="space-x-3">
                        <label>E-mail</label>
                        <input className="bordaInput w-72 h-auto"
                            type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="space-x-3">
                        <label>Senha:</label>
                        <input className="bordaInput w-72 "
                            type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>

                    <div className=" space-x-4">
                        <label>Departamento:</label>
                        <select id="departamento" className="bordaInput w-56 px-3 py-1"
                            value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                            <option>Selecione</option>
                            {departamentos.map((departamento, index) => (
                                <option value={departamento} key={index}>{departamento}</option>
                            ))}
                        </select>

                    </div>

                    <div className="space-x-4 -ml-20">
                        <label htmlFor=""> É um Administrador?</label>
                        <select
                            id="nivelPermissao"
                            className="bordaInput px-3 py-1"
                            value={admin ? 'true' : 'false'}
                            onChange={handleAdminChange}
                        >

                            <option value={'true'}>Sim</option>
                            <option value={'false'}>Não</option>

                        </select>




                    </div>


                    <div className="space-x-3 -ml-20">
                        <label>Nível de permissão:</label>
                        <select
                            id="nivelPermissao"
                            className="bordaInput px-3 py-1"
                            value={permissao} onChange={(e) => setPermissao(e.target.value)}
                            disabled={admin}
                        >
                            <option value={""}>Selecione</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </div>

                    <div>
                        <button className="bordaInput  shadow-md shadow-gray-500 transition-all hover:shadow-lg
                         hover:shadow-gray-500 focus:opacity-[0.85] 
                        focus:shadow-none active:opacity-[0.85] 
                        active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={handleAdicionarUsuario}>
                            Adicionar à lista
                        </button>
                    </div>


                </form>

            </div>



            <div className="space-y-5">

                <div className="h-56 w-full overflow-y-auto">

                    <div className="space-y-2 overflow-y-auto ">
                        {usuarios.map((usuario, index) => (
                            <div key={index}
                                className=" flex items-center justify-between space-x-3 bordaInput w-auto h-auto ">

                                <span>{usuario.login}</span>

                                {/* <button >ed</button> */}
                                <button
                                    onClick={(e) => DelUsuarioLista(index, e)}
                                > <MdDelete /> </button>


                            </div>
                        ))}
                    </div>


                </div>

                <div>

                    <button
                        className="btnAmarelos"
                        onClick={handleCadastrarUsuarios}>Cadastrar</button>

                    {alertModal && (
                        <InformationModal message={"Cadastro Realizado com Sucesso"} confirmText={"Ok"} onConfirm={() => window.location.href = '/'} />
                    )}

                </div>

            </div>

        </div>

    );

};

export default CadUsuario;