export const api_url = () => {
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL
    }
    else {
        return `http://localhost:3000/`
    }
}