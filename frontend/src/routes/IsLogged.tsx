import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
interface Props {
    page: any
}

export const IsLogged = (props: Props) => {
    const auth = useAuth()

    const signed = auth?.token;

    return signed ? <props.page /> : <Navigate to={"/login"} replace />
}
