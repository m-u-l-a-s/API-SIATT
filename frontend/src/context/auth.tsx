import { createContext, useState } from "react";
import { Login, authService } from "../services/services.auth";

interface AuthContextType {
    user : any
    token: string | null
    login: Function
    logout: Function
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: any) {
    const [user, setUser] = useState(authService.getUser());
    const [token, setToken] = useState<string | null>(authService.getToken());

    const login = async (data: Login) => {
        await authService.autenticarUsuario(data).then(async resp => {
            switch (resp.status) {
                case 201:
                    authService.setToken(resp.data.access_token)
                    authService.setUser(resp.data.user)
                    setToken(resp.data.access_token)
                    setUser(resp.data.user)
                    break;
                case 401:
                    setUser(null)
                    setToken(null)
                    throw new Error("Login ou senha inválidos")
            }
        })
    };

    const logout = () => {
        authService.removeToken()
        authService.removeUser()
        setToken(null)
        setUser(null)
    };

    return (
        < AuthContext.Provider value={{ token, login, logout, user }}>{children}</AuthContext.Provider>
    )
}
