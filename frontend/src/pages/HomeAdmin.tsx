import { FaCalendarAlt, FaPencilAlt, FaCalendarCheck } from "react-icons/fa";
import { CardHome } from "../components/CardHome";

export const HomeAdmin = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-around space-x-8 text-black font-medium">
          <CardHome
            icon={<FaPencilAlt className="h-10 w-7" />}
            titleCard="Cadastrar Salas / Usuários"
            buttonText="Cadastrar"
            buttonLink="/Cadastro"
          ></CardHome>

          <div className="flex flex-col w-1 bg-gray-500 space-y-5">
            <span className="text-gray-500"> . </span>
          </div>

          <CardHome
            icon={<FaCalendarAlt className="h-10 w-7" />}
            titleCard="Agendar um nova reunião"
            buttonText="Criar Reunião"
            buttonLink="/Home/Agendamento"
          ></CardHome>

          <div className="flex flex-col w-1 bg-gray-500 space-y-5">
            <span className="text-gray-500"> . </span>
          </div>

          <CardHome
            icon={<FaCalendarCheck className="h-10 w-8" />}
            titleCard="Visualizar Agenda"
            buttonText="Reuniões"
            buttonLink="/home"
          ></CardHome>

          {/* <CardHome
            icon={<FaSearch className="h-10 w-7" />}
            titleCard="Pesquisar e Editar"
            buttonText="Pesquisar"
            buttonLink="#"
          ></CardHome> */}
        </div>
      </div>
    </>
  );
};
