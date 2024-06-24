import { Routes, Route } from "react-router-dom";
import { FormularioReuniao } from "../pages/FormularioReuniao";
import { HomeAdmin } from "../pages/HomeAdmin";
import Login from "../pages/Login";
import PagAgendamento from "../pages/PagAgendamento";
import { IsLogged } from "./IsLogged";
import { Private } from "./Private";
import PagCadastro from "../pages/PagCadastro";
import { EditarReuniao } from "../pages/EditarReuniao";
import ListarCadastrados from "../pages/ListarCadastrados";
import ZoomRedirect from "../components/ZoomRedirect";
import EditarUsuario from "../pages/EditarUsuario";
import { EditarSala } from "../pages/EditarSala";



export const Rotas = () => {
  return (
    <Routes>
      {/* Rotas privada */}
      <Route path="/" element={<Private page={HomeAdmin} />} />
      <Route path="/Cadastro" element={<Private page={PagCadastro} />} />
      <Route path="/home/ListarCadastrados" element={<Private page={ListarCadastrados} />} />
      {/* Rotas privada */}

      {/* Rotas De usuários logados */}
      <Route path="/Home" element={<IsLogged page={PagAgendamento} />} />
      <Route path="/Home/Agendamento" element={<IsLogged page={FormularioReuniao} />} />
      <Route path="/Home/EditarReuniao/:id" element={<IsLogged page={EditarReuniao} />} />
      <Route path="/zoom" element={<ZoomRedirect/>} />
      <Route path="/Home/EditarUsuario/:id" element={<IsLogged page={EditarUsuario} />} />
      <Route path="/Home/EditarSala/:id" element={<IsLogged page={EditarSala} />} />
      {/* Rotas De usuários logados */}

      {/* Rotas publicas */}
      <Route path="*" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      {/* Rotas publicas */}

      

    </Routes>
  );
};

export default Rotas;
