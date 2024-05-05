import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
interface Props {
    page: any
}

export const Private = (props: Props) => {
    const auth = useAuth()

    const signed = auth?.token;

    const admin = auth?.admin;

    switch (admin) {
        case false:
            if (signed) {
                return <Navigate to={"/home"} replace />
            } else {
                return <Navigate to={"/login"} replace />
            }
        case true:
            return <props.page />
    }
}
