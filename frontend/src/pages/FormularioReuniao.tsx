import { useState } from "react";
import Navbar from "../components/Navbar";
import { GrAttachment, GrAdd } from "react-icons/gr";
import CalendarPicker from "../components/DateCalendar";
import ListaEmails from "../components/ListaEmails";
import TimeChoser from "../components/TimeChoser";
import { Tabs } from "../components/Tabs";

export enum Categoria {
    VIRTUAL = "virtual",
    PRESENCIAL = "presencial",
    HIBRIDA = "hibrida"
}


export function FormularioReuniao() {
    const [form, setForm] = useState(Categoria.PRESENCIAL)
    const [emailInput, setEmailInput] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);

    const handleInputChange = (e: any) => {
        setEmailInput(e.target.value);
    };

    const handleAddEmail = (event : any) => {
        event.preventDefault();
        console.log(event.message)
        if (emailInput.trim() !== '') {
            console.log(emailInput)
            setEmails([...emails, emailInput]);
            setEmailInput('');
        }
    };

    return (
        <>
            <Navbar />
            <Tabs state={form} setState={setForm} />

            <div className="flex items-start justify-center mt-4 text-black font-medium">

                <form action="" className="justify-center space-x-40 ">

                    <div className="flex  justify-center space-x-40" >

                        <div className="space-y-5 ">

                            <div className="flex justify-between">
                                <div className="flex items-start space-x-4">
                                    <label
                                        htmlFor="dataReuniao">Data:</label>
                                    <CalendarPicker /> {/* CHAMANDO DATA PICKER?  */}
                                </div>

                                <div className="ml-4">
                                    <label
                                        htmlFor="horarioReuniao"
                                        className="pr-4">Hora:</label>
                                    <TimeChoser />
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">

                                <label
                                    htmlFor="tempoDuracao">Duração:</label>
                                <TimeChoser />

                            </div>


                            <div className="flex items-start space-x-2">
                                <label>Título da Reunião:</label>
                                <input
                                    className="border bg-white border-gray-300 rounded-lg px-3  w-96 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                                    type="text"
                                    id="tituloReuniao" name="tituloReuniao" />
                            </div>


                            <div className="flex items-start">
                                <label>Pauta:</label>
                            </div>

                            <div className="flex items-start">
                                <textarea
                                    className="border bg-white border-gray-300 rounded-lg px-3 py-2 w-full h-20 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400"
                                    id="pautaReuniao" name="pautaReuniao" />
                            </div>

                            <div className="flex items-start space-x-2">

                                <button className="flex items-center justify-center border bg-white
                            border-gray-300 rounded-lg px-3 py-2 w-full h-10 focus:outline-none
                            focus:border-gray-500 focus:ring-gray-400"
                                    type="button" id="botaoAnexo" name="botaoAnexo">

                                    <GrAttachment className="mr-2" />
                                    Anexar documento

                                </button>
                            </div>

                        </div>

                        {/* SEGUNDA COLUNA DO FORMULARIO */}

                        <div className="space-y-7 ml-10">

                            <div className="flex items-start space-x-2" >
                                <label htmlFor=""> E-mail dos convidados: </label>
                                <input
                                    placeholder="exemplo@exemplo.com"
                                    className="border bg-white border-gray-300 rounded-lg px-3 w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400 "
                                    type="text"
                                    value={emailInput}
                                    onChange={handleInputChange}
                                />

                                <button
                                    onClick={handleAddEmail}
                                    className="flex items-center justify-center border border-gray-300 bg-white text-gray-700 font-semibold 
                                py-2 px-4 w-8 h-8 rounded-full cursor-pointer hover:bg-gray-100 w-auto"
                                >
                                    <GrAdd />
                                </button>


                            </div>




                            <ListaEmails emails={emails} setEmails={setEmails} />

                            {(form === Categoria.PRESENCIAL || form === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label htmlFor="">Número de Convidados:</label>
                                    <input
                                        type="number"
                                        id="nConvidados" name="nConvidados"
                                        className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 
                            focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                    </input>
                                </div>
                            )}
                            
                            <div className="flex items-start">
                                <label>Escolha sua sala</label>
                            </div>

                            {(form === Categoria.VIRTUAL || form === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label> Sala Online:</label>
                                    <select name="salas" id="salas" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                        <option value="sala1">Sala 1</option>
                                        <option value="sala2">Sala 2</option>
                                        <option value="sala3">Sala 3</option>
                                        <option value="sala4">Sala 4</option>
                                    </select>
                                </div>
                            )}

                            {(form === Categoria.PRESENCIAL || form === Categoria.HIBRIDA) && (
                                <div className="flex items-start space-x-2">
                                    <label >Sala Presencial:</label>
                                    <select name="cars" id="cars" className="text-center border bg-white border-gray-300 rounded-lg w-72 h-8 focus:outline-none focus:border-gray-500 focus:ring-gray-400">
                                        <option className="" value="volvo">Sala 1</option>
                                        <option value="saab">Sala 2</option>
                                        <option value="opel">Sala 3</option>
                                        <option value="audi">Sala 4</option>
                                    </select>
                                </div>
                            )}
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

            </div>
        </>
    )
}