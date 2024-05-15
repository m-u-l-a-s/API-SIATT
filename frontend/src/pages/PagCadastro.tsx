import {MenuSuperiorCadastro} from "../components/MenuSuperiorCadastro";
import { useState } from "react";
import CadSala from "../components/CadSala";
import CadUsuario from "./CadUsuario";

export enum btnCadastro{
    SALAS='salas',
    PESSOAS='pessoas'
}


const PagCadastro = () => {

  const [pagPadrao,setPagPadrao] = useState<btnCadastro>(btnCadastro.PESSOAS);
  
  return (
    <>
        <MenuSuperiorCadastro state={pagPadrao} setState={setPagPadrao}/>
        <hr/>
        {pagPadrao == btnCadastro.PESSOAS &&(
            <CadUsuario/>)
        }
        {pagPadrao == btnCadastro.SALAS &&(
            <CadSala/>)
        }
        
    </>
  );
}

export default PagCadastro



