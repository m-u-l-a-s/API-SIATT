import { Routes, Route,  } from "react-router-dom";
import PagAgendamento from "./PagAgendamento";
import { FormularioReuniao } from "./FormularioReuniao";



export const Rotas = () => {
    return (

        <Routes>
            <Route path="/" element={<PagAgendamento />} />
            <Route path="/Home" element={<PagAgendamento />} />
            <Route path="/Home/Agendamento" element={<FormularioReuniao />} />
        </Routes>

    );
};

export default Rotas;
