import { cookie } from "../variables";
import api from "./api";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface Login {
    email: string
    senha: string
}

export const authService = {
    async autenticarUsuario(data: Login) {
        return await api.post("auth/login", data)
    },

    setToken(data: any) {
        localStorage.setItem("token", data)
        cookie.set('token',data)
    },
    
    setUser(data: string) {
        cookie.set('user',data)
    },

    getToken() {
        return cookie.get('token')
    },
    
    getUser() {
        return cookie.get("user")
    },

    removeToken() {
        cookie.remove('token')
    },

    removeUser() {
        cookie.remove("user")
    },
    decodificarToken (token : string | null | undefined){
        if (token) {
            const decode = jwtDecode(token)
            return decode?.email
        }
        return null
    },

    setZoomToken(data : string){
        localStorage.setItem("ZOOM_TOKEN",data)
    },

    getZoomToken(){
        return localStorage.getItem("ZOOM_TOKEN")
    },

    isTokenExpired(token: string): boolean {
        try {
            const decode : JwtPayload = jwtDecode(token)
            
            if (typeof decode.exp !== 'number') {
                throw new Error("Token não contém campo 'exp' (expiration time).");
            }
    
            const dateExp : Date = this.timestampToDate(decode.exp)
            const dateAtual : Date = new Date()

            return dateAtual > dateExp
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            return true; // Considera como expirado em caso de erro (segurança)
        }
    },
    timestampToDate(timestamp: number): Date {
        // Multiplica por 1000 se o timestamp estiver em segundos (Unix)
        const timestampInMilliseconds = timestamp * 1000;
        const date = new Date(timestampInMilliseconds);
    
        return date; // Retorna um objeto Date
    }
}