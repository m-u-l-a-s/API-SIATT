import api from "./api";

export interface Login {
    email: string
    senha: string
}

export const authService = {
    async autenticarUsuario(data: Login) {
        return await api.post("auth/login", data)
    },

    setToken(data: any) {
        localStorage.setItem("TOKEN", data)
    },

    getToken() {
        return localStorage.getItem("TOKEN")
    }
}
