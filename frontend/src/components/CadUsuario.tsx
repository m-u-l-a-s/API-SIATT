import { useState } from "react";
import { api_url } from "../variables";


interface Usuario {
    login: string;
    email: string;
    departamento: string;
    permissao : Number ;
    senha: string;
    status: 1;
}



const CadUsuario = () => {

    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [departamento, setDepartamento] = useState<string>('');
    const [permissao, setPermissao] = useState<string>('1');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [departamentos] = useState<string[]>(['financeiro', 'comercial', 'tecnico', "administrativo" ]);

    const handleAdicionarUsuario = (event: any) => {
        if(permissao == undefined){
           throw new Error ("Permissao vazia")
        }
        event.preventDefault();
        const novoUsuario: Usuario = { login, email, senha, departamento, permissao:Number(permissao), status:1 };
        setUsuarios([...usuarios, novoUsuario]);

    };

    const handleCadastrarUsuarios = async () => {
        // Implemente a lógica para enviar os usuários cadastrados para o backend
        usuarios.forEach(async usuario => {

             await fetch(`${api_url()}usuario`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }).then(Resposta => {
                if (!Resposta.ok){
                    throw new Error("Seu Cadastro não foi realizado!") 
                }
                console.log(Resposta.ok)
            })

        })
        console.log('Usuários cadastrados:', usuarios);
    };

    return (

        <div className="flex flex-col items-center space-y-10 mt-4 text-black font-medium">

            <div>   

            <form className="space-x-3 space-y-3">



                <div className="space-x-3">
                    <label>Nome:</label>
                    <input className="bordaInput w-auto h-auto"
                        type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>

                <div className="space-x-3">
                    <label>E-mail</label>
                    <input className="bordaInput w-auto h-auto"
                        type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-x-3">
                    <label>Senha:</label>
                    <input className="bordaInput"
                        type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

                <div className=" space-x-3">
                    <label>Departamento:</label>
                    <select id="departamento" className="bordaInput px-3 py-1"
                        value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                            <option>Selecione</option>
                        {departamentos.map((departamento, index) => (
                            <option value={departamento} key={index}>{departamento}</option>
                        ))}
                    </select>

                </div>

                <div className="space-x-3">
                    <label>Nível de permissão:</label>
                    <select
                        id="nivelPermissao"
                        className="bordaInput px-3 py-1"
                        value={permissao} onChange={(e) => setPermissao(e.target.value)}
                    >
                        <option value={""}>Selecione</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>

                <div>
                    <button className="bordaInput" onClick={handleAdicionarUsuario}>
                        Adicionar  usuário
                    </button>
                </div>


            </form>

            </div> 

            <div>

            <div className="space-y-2">
                {usuarios.map((usuario, index) => (
                    <div key={index}
                    className=" flex items-center space-x-3 bordaInput w-auto h-auto ">

                        <span className="">{usuario.login}</span>
                        <div className=" flex items-center justify-end w-full h-auto space-x-3" >
                        <button >ed</button>
                        <button >ex</button>
                        </div>
                        
                    </div>
                ))}
            </div>

            </div>

            <div>

            <button 
            className="rounded-lg bg-red-600 py-4 px-20 font-sans text-xs font-bold uppercase 
            text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg 
            hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
            active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleCadastrarUsuarios}>Cadastrar</button>

            </div>

        </div>

    );

};

export default CadUsuario;