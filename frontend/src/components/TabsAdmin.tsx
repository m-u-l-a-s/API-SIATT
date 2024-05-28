import { Tipo } from "../pages/ListarCadastrados";

interface openTab {
    state: Tipo
    setState: Function
}


export function TabsAdmin(props : openTab) {
    return (
        <>
            <div className="flex flex-wrap text-black">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Tipo.USUARIO ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Tipo.USUARIO)}
                                role="tab"
                            >
                                Usuários
                            </a>
                        </li>

                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Tipo.SALA ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Tipo.SALA)}
                                role="tab"
                            >
                                Salas
                            </a>
                        </li>

                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Tipo.REUNIAO ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Tipo.REUNIAO)}
                                role="tab"
                            >
                                Reuniões
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}