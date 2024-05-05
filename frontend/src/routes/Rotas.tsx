import { Routes, Route } from "react-router-dom";
import { FormularioReuniao } from "../pages/FormularioReuniao";
import { HomeAdmin } from "../pages/HomeAdmin";
import CadUsuario from "../pages/CadUsuario";
import Login from "../pages/Login";
import PagAgendamento from "../pages/PagAgendamento";
import { IsLogged } from "./IsLogged";
import { Private } from "./Private";


export const Rotas = () => {
  return (
    <Routes>
      {/* Rotas privada */}
      <Route path="/" element={<Private page={HomeAdmin} />} />
      <Route path="/Cadastro" element={<Private page={CadUsuario} />} />
      {/* Rotas privada */}

      {/* Rotas De usuários logados */}
      <Route path="/Home" element={<IsLogged page={PagAgendamento} />} />
      <Route path="/Home/Agendamento" element={<IsLogged page={FormularioReuniao} />} />
      {/* Rotas De usuários logados */}

      {/* Rotas publicas */}
      <Route path="*" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      {/* Rotas publicas */}

    </Routes>
  );
};

export default Rotas;
