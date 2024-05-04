import axios from "axios"
import { api_url } from "../variables"
import { authService } from "./auth";

const api = axios.create({baseURL : api_url()});

api.interceptors.request.use( async config => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api;

