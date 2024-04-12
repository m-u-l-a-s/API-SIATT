import Navbar from "../components/Navbar"
import Calendar from "../components/Calendar"
import ButtonAdd from "../components/ButtonAdd";
import MeetingDetail from "../components/MeetingDetail";
import SearchInput from "../components/SearchInput";
import { Link } from "react-router-dom";

const PagAgendamento = () => {

    return (
        <div>
            <Navbar/>
            <h1 className="text-fonteAmarela mt-6">Seu calendário de reuniões</h1>
            
            <div className="conteudo flex flex-col md:flex-row">

                <div className="coluna-1 md:w-2/3 md:order-1 h-screen p-4 sm:w-screen">

                        <h2 className="text-fonteVermelha text-3xl flex flex-initial"> 
                            <a className="text-fonteVermelha p-4 hover:cursor-pointer">Mensal</a> 
                            <span className="flex items-center">|</span>
                            <a className="text-fonteVermelha p-4 hover:cursor-pointer">Criado por mim</a>
                        </h2>

                    <MeetingDetail title="Reunião com Cláudia" date="2024/04/08" time="17:00" place="online"/>
                    <MeetingDetail title="Reunião com Cláudia" date="2024/04/08" time="17:00" place="online"/>
                    <MeetingDetail title="Reunião com Cláudia" date="2024/04/08" time="17:00" place="online"/>
                    <MeetingDetail title="Reunião com Cláudia" date="2024/04/08" time="17:00" place="online"/>

                </div>


                <div className="coluna-2 md:w-1/3 md:order-2 h-screen p-4 sm:w-screen">
                    {/* <span className="mt-20">.</span> */}
                    <SearchInput/>
                    <Calendar/>

                    <Link to="/Home/Agendamento">
                    <ButtonAdd/>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default PagAgendamento; 
