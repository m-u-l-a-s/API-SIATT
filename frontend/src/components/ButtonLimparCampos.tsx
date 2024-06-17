import { useState } from "react";

interface ButtonLimparCampos {
     functionLimparCampos: Function
}

export default function ButtonLimparCampos(props : ButtonLimparCampos) {
     const [showModal, setShowModal] = useState(false);

     return (
          <>
               <button
                    className="rounded-lg bg-white border-gray-500 py-4 px-20 font-sans text-xs font-bold uppercase 
                    text-black shadow-md transition-all hover:shadow-lg hover:shadow-gray-500 
                    focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setShowModal(true)}
               >
                    Limpar Campos
               </button>
               {showModal ? (
                    <>
                         <div
                              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                         >
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                   {/*content*/}
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                             <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                  Tem certeza que deseja limpar todos os campos?
                                             </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                             <button
                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() => setShowModal(false)}
                                             >
                                                  Cancelar
                                             </button>
                                             <button
                                                  className="bg-yellow-300 text-black active:bg-yellow-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() => {
                                                       props.functionLimparCampos()
                                                       setShowModal(false)
                                                  }}>
                                             Sim, limpar tudo.
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
     ) : null
}
          </>
     );
}
