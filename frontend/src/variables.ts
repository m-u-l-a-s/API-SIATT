import Cookies from "universal-cookie";

export const api_url = () => {
        return "http://localhost:3000/"
};

export const getZoomClientId = () => {
        return import.meta.env.VITE_ZOOM_CLIENT_ID
}


export const getZoomApiKey = () => {
        return import.meta.env.VITE_ZOOM_API_KEY
}


export const getZoomApiSecret = () => {
        return import.meta.env.VITE_ZOOM_API_SECRET
}


export const getZoomRedirectUrl = () => {
        return import.meta.env.VITE_ZOOM_REDIRECT_URL
}


export const cookie = new Cookies();