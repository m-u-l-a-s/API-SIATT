import React, { createContext, useState } from "react";
import { Login, authService } from "../services/services.auth";

interface AuthContextType{
    admin : boolean
    token : string | null
    login : Function
    logout : Function
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider ({children} : any){
    const [admin, setAdmin] = useState<boolean>(authService.getAdmin())
    const [token, setToken] = useState<string | null>(authService.getToken());

    const login = async (data: Login) => {
        const t = await authService.autenticarUsuario(data);
        switch (t.status) {
            case 201:
                authService.setTokenLocalStorage(t.data.access_token)
                authService.setAdminLocalStorage(t.data.admin)
                console.log(t.data)
                setToken(t.data.access_token)
                setAdmin(t.data.admin)
                
                break;
            case 401:
                setAdmin(false)
                setToken(null)
                throw new Error("Login ou senha inválidos")
        }
        return
    };

    const logout = () => {
        authService.removeToken()

        setToken(null)
        setAdmin(false)
    };

    return (
        < AuthContext.Provider value={{token, login, logout, admin}}>{children}</AuthContext.Provider>
      );
}