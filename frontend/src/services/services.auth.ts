import api from "./api";



export interface Login {
    email: string
    senha: string
}

export const authService = {
    async autenticarUsuario(data: Login) {
        return await api.post("auth/login", data)
    },

    setTokenLocalStorage(data: any) {
        localStorage.setItem("token", data)
    },

    getToken() {
        return localStorage.getItem("token")
    },

    removeToken() {
        localStorage.removeItem("token")
    },

    setAdminLocalStorage(data: boolean) {
        if (data) {
            localStorage.setItem("admin", '1')
        } else { localStorage.setItem("admin", '0') }
    },

    getAdmin() {
        let admin = localStorage.getItem("admin")
        switch (admin) {
            case '1':
                return true
            case '0':
                return false
            default:
                return false
        }
    },
    removeAdmin() {
        localStorage.removeItem("admin")
    },
}
