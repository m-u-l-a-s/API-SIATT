
import CalendarPicker from "../components/DateCalendar";
import TimeChoser from "../components/TimeChoser";
import { GrAttachment } from "react-icons/gr";

const FormularioOnline = () => {

    return (

        <div className="flex flex-col items-center justify-center mt-4 text-black font-medium">

            <form action="" className="justify-center space-x-40 ">

                <div className="flex  justify-center space-x-40" >

                    <div className="space-y-5 ">

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

                        <div className="flex items-start space-x-2">

                        <button className="flex items-center justify-center border bg-white
                        border-gray-300 rounded-lg px-3 py-2 w-full h-10 focus:outline-none
                         focus:border-gray-500 focus:ring-gray-400">

                            <GrAttachment className="mr-2" />
                            Anexar documento

                        </button>
                    </div>

                    </div>



                    <div className="space-y-7 ml-10">

                        <div className="flex items-start space-x-2" >
                            <label htmlFor=""> E-mail dos convidados: </label>
                            <input placeholder="exemplo@exemplo.com" className="border bg-white border-gray-300 rounded-lg px-3 w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                        </div>

                        <div className="email-list max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>email</span>
                                <button className="text-gray-500 hover:text-gray-700">X</button>
                            </div>
                            {/* Repita essa estrutura conforme necessário para mais e-mails */}

                        </div>

                        <div className="flex items-start">
                            <label>Selecione a sua sala</label>
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

                    </div>

                </div>

                <div>
                    <div className="flex  items-center justify-between mt-9 text-black font-medium px-56  -space-x-">

                        <button
                            className="rounded-lg bg-white border-gray-500 py-4 px-20 font-sans text-xs font-bold uppercase 
text-black shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                        >
                            Limpar Campos
                        </button>

                        <button
                            className="rounded-lg bg-red-600 py-4 px-20 font-sans text-xs font-bold uppercase 
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


            {/* <ButtonsForms /> */}

        </div>

    );

};

export default FormularioOnline;