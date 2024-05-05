import { btnCadastro } from "../pages/PagCadastro"

interface pgCad{
  state:btnCadastro,
  setState:Function
}

export function MenuSuperiorCadastro(props:pgCad){
  
  return (
    <>
        <div className="text-2xl font-bold mt-2 mb-0.5 text-center">
            Cadastros
        </div>

        <div className="mb-1">
          <ul className="flex flex-row gap-1 justify-around pt-0.5 p-1">

            <li className="flex-auto">
              <button type="button" 
                className={ 
                "bg-white text-xs px-5 py-3 border-t-slate-100 border-x-slate-100 border-t-[0.01px]" + 
                "border-x-[0.1px] font-bold uppercase w-full shadow-md rounded text-center p-1.5" + 
                (props.state===btnCadastro.PESSOAS ? "text-black bg-yellow-300 border-t-slate-100 border-x-slate-100 border-t-[0.01px] border-x-[0.1px]" : "  hover:bg-yellow-200 border-t-slate-100 border-x-slate-100 border-t-[0.01px] border-x-[0.1px]" )
                }
                onClick={() => props.setState(btnCadastro.PESSOAS)}
              >
                Pessoas
              </button>
            </li>

            <li className=" flex-auto">
              <button type="button" 
                className={
                "bg-white text-xs font-bold px-5 py-3 border-t-slate-100 border-x-slate-100" +
                "border-t-[0.01px] border-x-[0.1px] uppercase w-full shadow-md rounded text-center p-1.5" +
                (props.state===btnCadastro.SALAS ? "text-black bg-yellow-300 border-t-slate-100 border-x-slate-100 border-t-[0.01px] border-x-[0.1px]" : " hover:bg-yellow-200 border-t-slate-100 border-x-slate-100 border-t-[0.01px] border-x-[0.1px]")
                }
                onClick={() => props.setState(btnCadastro.SALAS)}
              >
                Salas
              </button>
            </li>

          </ul>
        </div>

    </>
  )
}


