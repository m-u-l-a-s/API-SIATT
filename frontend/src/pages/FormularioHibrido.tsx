import CalendarPicker from "../components/DateCalendar";
import { GrAttachment } from "react-icons/gr";

const FormularioHibrido = () => {

    return (

        <div className="flex items-start justify-center mt-9 text-black font-medium">

            <form action="" className="flex  justify-center space-x-40">

                <div className="space-y-5 ">
                    <div className="flex items-start space-x-4">
                        <label htmlFor="">Quando:</label>

                        <CalendarPicker /> {/* CHAMANDO DATA PICKER?  */}

                        <div className="flex ">
                            <select name="hours" className="text-center bg-transparent text-xl px-2 appearance-none outline-none cursor-pointer">
                                <option value="1" className="text-center">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <span className="text-xl mr-3">:</span>
                            <select name="minutes" className="bg-transparent text-xl px-2 appearance-none outline-none mr-4 cursor-pointer">
                                <option value="0">00</option>
                                <option value="30">05</option>
                                <option value="30">10</option>
                                <option value="30">15</option>
                                <option value="30">20</option>
                                <option value="30">25</option>
                                <option value="30">30</option>
                                <option value="30">35</option>
                                <option value="30">40</option>
                                <option value="30">45</option>
                                <option value="30">50</option>
                                <option value="30">55</option>
                            </select>
                            <select name="ampm" className="bg-transparent text-xl px-2 appearance-none outline-none cursor-pointer">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select>
                        </div>


                    </div>

                    <div className="flex items-start space-x-2">

                        <label>Duração:</label>
                        <select name="hours" className="bg-transparent text-xl px-2 middle none center appearance-none outline-none cursor-pointer">
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10 </option>
                            <option value="11">11 </option>
                            <option value="12">12 </option>
                        </select>
                        <span className="text-xl mr-3">h</span>

                        <select name="minutes" className="bg-transparent text-xl px-2 appearance-none outline-none mr-4 cursor-pointer">
                            <option value="0">00</option>
                            <option value="30">05</option>
                            <option value="30">10</option>
                            <option value="30">15</option>
                            <option value="30">20</option>
                            <option value="30">25</option>
                            <option value="30">30</option>
                            <option value="30">35</option>
                            <option value="30">40</option>
                            <option value="30">45</option>
                            <option value="30">50</option>
                            <option value="30">55</option>
                        </select>
                        <span className="text-xl mr-3">min</span>


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

                        <button className="flex items-center justify-center border bg-white border-gray-300 rounded-lg px-3 py-2 w-full h-10 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                            <GrAttachment className="mr-2" />
                            Anexar documento
                        </button>
                    </div>

                </div>

                {/* SEGUNDA COLUNA DO FORMULÁRIO */}

                <div className="space-y-5">

                    <div className="flex items-start space-x-2" >
                        <label htmlFor=""> E-mail dos convidados </label>
                        <input placeholder="exemplo@exemplo.com" className="border bg-white border-gray-300 rounded-lg px-3  w-96 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                    </div>


                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Número de Convidados Presencial:</label>
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

                    <div className=" flex justify-between p-4">
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

export default FormularioHibrido;