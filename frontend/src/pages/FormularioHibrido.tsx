


const FormularioHibrido = () => {

    return (

        <div className="flex items-start justify-center mt-9 text-black font-medium">


            <form action="" className="flex  justify-center space-x-40">

                <div className="space-y-5 ">
                    <div className="flex items-start space-x-4">
                        <label htmlFor="">Quando:</label>

                        <input placeholder="24/06/2024" className="border border-gray-300 rounded-lg px-3 py-2 w-32 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400" />


                        <div className="flex ">
                            <select name="hours" className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">10</option>
                                <option value="12">12</option>
                            </select>
                            <span className="text-xl mr-3">:</span>
                            <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4 cursor-pointer">
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
                            <select name="ampm" className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                            </select>
                        </div>


                    </div>

                    <div className="flex items-start space-x-2">

                        <label>Duração:</label>
                        <select name="hours" className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">10</option>
                            <option value="12">12</option>
                        </select>
                        <label>h</label>

                        <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4 cursor-pointer">
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
                        <label>min</label>


                    </div>


                    <div className="flex items-start space-x-2">
                        <label>Títilo da Reunião:</label>
                        <input className="border border-gray-300 rounded-lg px-3  w-96 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400 " type="text" />
                    </div>


                    <div className="flex items-start">
                        <label>Pauta:</label>
                    </div>

                    <div className="flex items-start">
                        <textarea className="border border-gray-300 rounded-lg px-3 py-2 w-full h-20 focus:outline-none focus:border-gray-500 focus:ring-gray-400" />
                    </div>


                    <div className="flex items-start space-x-2">
                        <label htmlFor="">Anexos:</label>
                        <button>Anexos</button>
                    </div>

                </div>

                <div className="space-y-5 ">

                <div className="flex items-start">
                    <label htmlFor="">E-mail dos convidados</label>
                    <input />
                </div>


                <div className="flex items-start space-x-2">
                    <label htmlFor="">Convidados presenciais:</label>
                    <select name="cars" id="cars" className="border border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                        <option value="volvo">1 pessoa </option>
                        <option value="saab">Até 4 pessoas</option>
                        <option value="opel">Até 10 essoas</option>
                        <option value="audi">Até 13 pessoas</option>
                        <option value="audi">Até 25 pessoas</option>
                    </select>
                </div>


                <div className="flex items-start">
                    <label >Escolha sua sala</label>
                </div>

                <div className="flex items-start space-x-2">
                    <label >Sala Online:</label>
                    <select name="cars" id="cars" className="border border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                        <option value="volvo">Sala 1</option>
                        <option value="saab">Sala 2</option>
                        <option value="opel">Sala 3</option>
                        <option value="audi">Sala 4</option>
                    </select>
                </div>
                <div className="flex items-start space-x-2">
                    <label >Sala Presencial:</label>
                    <select name="cars" id="cars" className=" align-text-bottom border border-gray-300 rounded-lg w-72 h-7 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                        <option  className="" value="volvo">Sala 1</option>
                        <option value="saab">Sala 2</option>
                        <option value="opel">Sala 3</option>
                        <option value="audi">Sala 4</option>
                    </select>


                </div>

                <div className=" flex justify-between">
                    <button className="bg-white border-gray-500 rounded-lg px-3 py-2  focus:outline-none focus:border-gray-500 focus:ring-gray-500">Limpar Campos</button>
                    <button className="bg-botaoVermelho  focus:border-red-600 focus:ring-red-500">Agendar</button>
                </div>

                </div>

            </form>

        </div>

    );
};

export default FormularioHibrido;