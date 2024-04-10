import CalendarPicker from "../components/DateCalendar";
import TimeChoser from "../components/TimeChoser";
import { GrAttachment } from "react-icons/gr";

const FormularioOnline = () => {

    return (

        <div className="flex items-start justify-center mt-9 text-black font-medium">

            <form action="" className="flex  justify-center space-x-40">
                <div className="space-y-5 ">

                    <div className="flex items-start space-x-4">
                        <label htmlFor="">Quando:</label>
                        <CalendarPicker /> {/* CHAMANDO DATA PICKER?  */}
                        <TimeChoser />
                    </div>

                    <div className="flex items-start space-x-2">

                        <label>Duração:</label>
                            <TimeChoser/>

                    </div>


                    <div className="flex items-start space-x-2">
                        <label>Título da Reunião:</label>
                        <input className="border bg-white border-gray-300 rounded-lg px-3  w-96 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                    </div>


                    <div className="flex items-start">
                        <label>Pauta:</label>
                    </div>

                    <div className="flex items-start">
                        <textarea className="border bg-white border-gray-300 rounded-lg px-3 py-2 w-full h-20 focus:outline-none focus:border-gray-500 focus:ring-gray-400" />
                    </div>


                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Anexos:</label>
                        <button><GrAttachment /></button>
                    </div>

                </div>

                <div className="space-y-5">

                    <div className="flex items-start space-x-2" >
                        <label htmlFor=""> E-mail dos convidados </label>
                        <input placeholder="exemplo@exemplo.com" className="border bg-white border-gray-300 rounded-lg px-3  w-96 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                    </div>


                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Número de Convidados:</label>
                        <select name="cars" id="cars" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option value="volvo"> 1 pessoa </option>
                            <option value="saab"> Até 4 pessoas</option>
                            <option value="opel"> Até 10 essoas</option>
                            <option value="audi"> Até 13 pessoas</option>
                            <option value="audi"> Até 25 pessoas</option>
                        </select>
                    </div>


                    <div className="flex items-start">
                        <label>Escolha sua sala</label>
                    </div>

                    <div className="flex items-start space-x-2">
                        <label> Sala Online:</label>
                        <select name="cars" id="cars" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option value="volvo">Sala 1</option>
                            <option value="saab">Sala 2</option>
                            <option value="opel">Sala 3</option>
                            <option value="audi">Sala 4</option>
                        </select>
                    </div>
                    <div className="flex items-start space-x-2">
                        <label >Sala Presencial:</label>
                        <select name="cars" id="cars" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <option className="" value="volvo">Sala 1</option>
                            <option value="saab">Sala 2</option>
                            <option value="opel">Sala 3</option>
                            <option value="audi">Sala 4</option>
                        </select>


                    </div>

                    <div className=" flex justify-between">
                        <button
                            className="middle none center rounded-lg bg-white border-gray-500 py-4 px-10 font-sans text-xs font-bold uppercase 
                         text-black shadow-md transition-all hover:shadow-lg
                         hover:shadow-gray-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                         active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                        >Limpar Campos
                        </button>

                        <button
                            className="middle none center rounded-lg bg-red-600 py-4 px-12 font-sans text-xs font-bold uppercase 
                         text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg
                         hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
                         active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                        >
                            Agendar
                        </button>
                    </div>

                </div>
            </form>

        </div>

    );
};

export default FormularioOnline;