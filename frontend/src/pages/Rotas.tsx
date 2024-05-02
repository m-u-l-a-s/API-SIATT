import { Routes, Route } from "react-router-dom";
import PagAgendamento from "./PagAgendamento";
import { FormularioReuniao } from "./FormularioReuniao";
import { HomeAdmin } from "./HomeAdmin";
import CadUsuario from "./CadUsuario";
import Login from "./Login";

export const Rotas = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<PagAgendamento />} /> */}
      <Route path="/Home" element={<PagAgendamento />} />
      <Route path="/" element={<HomeAdmin />} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Home/Agendamento" element={<FormularioReuniao />} />
      <Route path="/Home/Cadastrar-Usuario" element={<CadUsuario/>}/>
    </Routes>
  );
};

export default Rotas;
