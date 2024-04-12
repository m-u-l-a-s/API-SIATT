import { Routes, Route,  } from "react-router-dom";
import PagAgendamento from "./PagAgendamento";
import Tabs from "../components/Tabs";



export const Rotas = () => {
    return (

        <Routes>
            <Route path="/" element={<PagAgendamento />} />
            <Route path="/Home/Agendamento" element={<Tabs />} />



        </Routes>

    );
};

export default Rotas;
