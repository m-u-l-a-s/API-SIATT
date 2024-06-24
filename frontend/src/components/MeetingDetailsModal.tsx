import { Categoria } from "../interfaces/CreateReuniaoDto"

interface MeetingDetailsModal {
    categoria: string
    titulo: string
    pauta: string
    participantes: string[]
    local: string
    confirmText: string;
    onConfirm: () => void;
}

export const MeetingDetailsModal = (props: MeetingDetailsModal) => {
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-6 flex-auto text-start">
                            <p><b>Título:</b> {props.titulo}</p>
                            <p><b>Pauta:</b> {props.pauta}</p>

                            {props.categoria == Categoria.VIRTUAL && (
                                <p><b>Endereço: </b><a target="_blank" className="link " href={props.local}>reunião no zoom</a></p>
                            )}

                            {props.categoria == Categoria.PRESENCIAL && (
                                <p><b>Local: </b>{props.local}</p>
                            )}

                            {props.categoria == Categoria.HIBRIDA && (
                                <>
                                    <p><b>Endereço: </b><a target="_blank" className="link" href={props.local.split(" | ")[1]}>reunião no zoom</a></p>
                                    <p><b>Local: </b>{props.local.split(" | ")[0]}</p>
                                </>
                            )}

                            <p><b>Participantes: </b></p>
                            <ul>
                                {props.participantes.map(p => {
                                    return (
                                        <li className="ml-4">{p}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-yellow-300 text-black active:bg-yellow-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={props.onConfirm}
                            >
                                {props.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

