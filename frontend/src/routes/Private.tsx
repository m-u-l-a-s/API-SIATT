import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
interface Props {
    page: any
}

export const Private = (props: Props) => {
    const auth = useAuth()

    if (auth?.token && auth.user.admin) {
        return <props.page />
    }
    if (auth?.token) {
        return <Navigate to={"/home"}/>
    }
    return <Navigate to={"/login"} replace />
}
