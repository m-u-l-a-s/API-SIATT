import ButtonsForms from "../components/ButtonsForms";
import CalendarPicker from "../components/DateCalendar";
import TimeChoser from "../components/TimeChoser";
import { GrAttachment } from "react-icons/gr";

const FormularioPresencial  = () => {

    return (

        <div className="flex flex-col items-start justify-center mt-9 text-black font-medium">

            <form action="" className="flex  justify-center space-x-40 ml-36">
                <div className="space-y-5 ml-20">

                    <div className="flex justify-between">
                        <div className="flex items-start space-x-4">
                            <label htmlFor="">Data:</label>
                            <CalendarPicker /> {/* CHAMANDO DATA PICKER?  */}
                        </div>

                        <div className="ml-4">
                            <label htmlFor="" className="pr-4">Hora:</label>
                            <TimeChoser />
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">

                        <label>Duração:</label>
                        <TimeChoser />

                    </div>


                    <div className="flex items-start space-x-2">
                        <label>Título da Reunião:</label>
                        <input className="border bg-white border-gray-300 rounded-lg px-3  w-96 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                    </div>


                    <div className="flex items-start">
                        <label>Pauta:</label>
                    </div>

                    <div className="flex items-start">
                        <textarea className="border bg-white border-gray-300 rounded-lg px-3 py-2 w-full h-20 focus:outline-none focus:border-gray-500 focus:ring-gray-400" />
                    </div>

                </div>

                <div className="space-y-7 ml-10">

                    <div className="flex items-start space-x-2" >
                        <label htmlFor=""> E-mail dos convidados: </label>
                        <input placeholder="exemplo@exemplo.com" className="border bg-white border-gray-300 rounded-lg px-3 w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text"/>
                    </div>


                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Número de Convidados:</label>
                        <select name="convidados" id="convidados" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option value="quant1"> 1 pessoa </option>
                            <option value="quant2"> Até 4 pessoas</option>
                            <option value="quant3"> Até 10 essoas</option>
                            <option value="quant4"> Até 13 pessoas</option>
                            <option value="quant5"> Até 25 pessoas</option>
                        </select>
                    </div>

                    
                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Anexos:</label>
                        <button><GrAttachment /></button>
                    </div>


                    <div className="flex items-start">
                        <label>Escolha sua sala</label>
                    </div>

                    <div className="flex items-start space-x-2">
                        <label> Sala Online:</label>
                        <select name="salas" id="salas" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option value="sala1">Sala 1</option>
                            <option value="sala2">Sala 2</option>
                            <option value="sala3">Sala 3</option>
                            <option value="sala4">Sala 4</option>
                        </select>
                    </div>

                    <div className="flex items-start space-x-2">
                        <label >Sala Presencial:</label>
                        <select name="cars" id="cars" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option className="" value="volvo">Sala 1</option>
                            <option value="saab">Sala 2</option>
                            <option value="opel">Sala 3</option>
                            <option value="audi">Sala 4</option>
                        </select>
                    </div>

                </div>
            </form>

            <ButtonsForms />

        </div>
                         
    );

};

 
 export default FormularioPresencial;