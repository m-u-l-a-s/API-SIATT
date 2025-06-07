import { useEffect, useState } from "react";
import api from "../services/api";
//import UserDetails from "../interfaces/UserDetails";
import { useLocation, useNavigate } from "react-router-dom";


interface Usuario {
    login: string;
    email: string;
    departamento: string;
    permissao: Number;
    status: 1;
    admin:boolean;
}

const EditarUsuario = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [departamento, setDepartamento] = useState<string>('');
    const [permissao, setPermissao] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false)

    const [departamentos] = useState<string[]>(['financeiro', 'comercial', 'tecnico', "administrativo"]);

    const validarDados = () : string => {
        let erros : string = ""
        if (login == "") {
            erros += "campo de login deve ser preenchido.\n"
        }
        if (email == "") {
            erros += "campo de email deve ser preenchido.\n"
        }
        if (departamento == "" || departamento == "Selecione") {
            erros += "campo de departamento deve ser preenchido.\n"
        }
        if (permissao == "") {
            erros += "campo de permissao deve ser preenchido.\n"
        }
        return erros
    }


    const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAdmin(e.target.value === 'true');
        if (e.target.value === 'true') {
            setPermissao('3');
        } else {
            setPermissao('');
        }
    };

    useEffect(() => {
        if (location.state && location.state.key) {
            const usuario: Usuario = location.state.key;
            setLogin(usuario.login);
            setEmail(usuario.email);
            setDepartamento(usuario.departamento);
            setPermissao(usuario.permissao.toString());
            setAdmin(usuario.admin);
        }
    }, [location.state]);
    

    const handleEditarUsuarios = async (id: string) => {
        const erros = validarDados()
        if (erros != "") {
            alert(erros)
            return
        } 
        try {
            const updatedUser: Usuario = { login, email, departamento, permissao: Number(permissao), status: 1, admin: Boolean(admin) };
            console.log(updatedUser);
            await api.put(`usuario/${id}`, updatedUser);
            console.log(updatedUser);
            navigate('/home/ListarCadastrados');
            
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }



    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEditarUsuarios(location.state.key.id);
    };

    return (

        <div className="flex items-center justify-center mt-28  space-x-52 first-line:font-medium">



            <form className=" space-y-4" onSubmit={handleSubmit}>



                <div className="space-x-3">
                    <label>Nome:</label>
                    <input className="bg-base-300 bordaInput text-base-content items-center w-72 h-auto"
                        type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>

                <div className="space-x-3">
                    <label>E-mail</label>
                    <input className="bg-base-300 bordaInput text-base-content w-72 h-auto"
                        type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className=" space-x-4">
                    <label>Departamento:</label>
                    <select id="departamento" className=" bg-base-300 bordaInput w-56 px-3 py-1"
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
                        className="bg-base-300 bordaInput px-3 py-1"
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
                        className="bg-base-300 bordaInput px-3 py-1"
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

                    <button
                        className="btnAmarelos"
                        type="submit"
                        //onClick={handleEditarUsuarios}
                       // onClick={() => handleEditarUsuarios(location.state.key.id)}
                        >Cadastrar</button>


                </div>


            </form>







        </div>

    );

};

export default EditarUsuario;