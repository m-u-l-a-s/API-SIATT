import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, authService } from '../services/services.auth';
import useAuth from '../hooks/useAuth';



const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();
    const auth = useAuth()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Login = { email: email, senha: senha }

        await auth?.login(data)
        navigate("/")
    };


    return (
        <div className="hero min-h-screen bg-base-200 play-bold text-white">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="w-[36rem] text-center lg:text-left flex flex-col">
                    <h1 className="text-5xl font-bold text-white">Acesse sua conta</h1>
                    <p className="py-6 text-white">
                        Com o Siatt Connect é fácil agendar e acompanhar as suas reuniões.
                    </p>
                    <img className="w-min mt-4 m-auto rounded-md text-center" src="..\siatt-logo.png" alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Senha</span>
                            </label>
                            <input
                                type="password"
                                placeholder="senha"
                                className="input input-bordered"
                                required
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            {/* Display login error message */}
                            {loginError && <p className="text-red-500">{loginError}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn hover:bg-fonteAmarela hover:text-black">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
