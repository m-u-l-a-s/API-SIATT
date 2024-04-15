import { Categoria } from "../pages/FormularioReuniao"

interface openTab {
    state: Categoria
    setState: Function
}



export function Tabs(props : openTab) {
    return (
        <>
            <div className="flex flex-wrap text-black">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Categoria.PRESENCIAL ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Categoria.PRESENCIAL)}
                                role="tab"
                            >
                                Presencial
                            </a>
                        </li>

                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Categoria.VIRTUAL ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Categoria.VIRTUAL)}
                                role="tab"
                            >
                                Online
                            </a>
                        </li>

                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-black hover:text-black " +
                                    (props.state === Categoria.HIBRIDA ? "text-black bg-yellow-300" : "text-color-600 bg-white")
                                }
                                onClick={() => props.setState(Categoria.HIBRIDA)}
                                role="tab"
                            >
                                Híbrido
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}