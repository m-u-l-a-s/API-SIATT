
import { useState } from "react"
import ConfirmationModal from "./ConfirmationModal"
import { api_url } from "../variables"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface salaVirtualCad{
    identificacao : string
    login : string
    senha : string
    permissao : number
}

interface salaPresencialCad{
    identificacao : string
    endereco : string
    permissao : number
    ocupacaoMax : number
    local : string
}

const CadSala = () => {
  //const - botão para selecionar formulário presencial ou virtual
  const [selectedButton,setSelectedButton] = useState<string>('Virtual');

  //const - modais para deletar e cadastrar listas
  const [modalDelete,setModalDelete] = useState(false);
  const [modalCadastro,setModalCadastro] = useState(false);


  // const - elem. formulário virtual
  const [identVirtual,setIdentVirtual]=useState<string>("");
  const [permissaoVirtual,setPermissaoVirtual]=useState<string>('0');
  const [login,setLogin]=useState<string>("");
  const [senha,setSenha]=useState<string>("");

  // const - elem. formulário presencial
  const [identPresencial,setIdentPresencial]=useState<string>("");
  const [permissaoPresencial,setPermissaoPresencial]=useState<string>('0');
  const [endereco,setEndereco]=useState<string>("");
  const [ocupacaoMax,setOcupacaoMax]=useState<string>('0');
  const [local,setLocal]=useState<string>("");

  //const - listas salas presenciais e virtuais
  const [salaVirtual, setSalaVirtual] = useState<salaVirtualCad[]>([]);
  const [salaPresencial, setSalaPresencial] = useState<salaPresencialCad[]>([]);

  //const - use navigate
  const navigate = useNavigate()

  //função limpar campos dos formulários
  const handleCleanForm = () =>{
    if (selectedButton==='Virtual') {
      setIdentVirtual("");
      setPermissaoVirtual("0");
      setLogin("");
      setSenha("");
    }
    else if (selectedButton==='Presencial'){
      setIdentPresencial("");
      setPermissaoPresencial("0");
      setEndereco("");
      setOcupacaoMax("0");
      setLocal("");
    }
  };

  // função para limpar lista de cadastros
  const handleDeleteList = () =>{
    setSalaPresencial([]);
    setSalaVirtual([]);
    setModalDelete(false);
  }

  //função adicionar salas na lista de cadastro
  const handleAddSalas = (event:any)=>{
      if (selectedButton==='Virtual'){
        event.preventDefault();
        const novaSalaVirtual:salaVirtualCad = {
          identificacao:identVirtual,
          login,
          senha,
          permissao:Number(permissaoVirtual),
        };
        setSalaVirtual([...salaVirtual,novaSalaVirtual]);
        console.log(salaVirtual)
        handleCleanForm();
      }
      else if (selectedButton==='Presencial'){
        event.preventDefault();
        const novaSalaPresencial:salaPresencialCad={
          identificacao:identPresencial,
          endereco,
          permissao:Number(permissaoPresencial),
          ocupacaoMax:Number(ocupacaoMax),
          local,
        }
        setSalaPresencial([...salaPresencial,novaSalaPresencial]);
        console.log(salaPresencial);
        handleCleanForm();
      }
  }

  //função p/excluir item único da lista de cadastro
  const handleDeleteItemPresencial = (itemToExclude:any) =>{
    const updateItem = salaPresencial.filter(item => item !== itemToExclude);
    setSalaPresencial(updateItem);
  }

  const handleDeleteItemVirtual = (itemToExclude:any) =>{
    const updateItem = salaVirtual.filter(item => item !== itemToExclude);
    setSalaVirtual(updateItem);
  }

  //função para cadastrar as listas
  const handlePostList = async () =>{
    salaVirtual.forEach(async salavirt =>{
        await fetch(`${api_url()}sala-virtual`,{
          method:'POST',
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify(salavirt)
        }).then(Resposta => {
          if (!Resposta.ok){
              throw new Error("Seu Cadastro não foi realizado!") 
          }
          console.log(Resposta.ok)
      })
    })

    salaPresencial.forEach(async salapres=>{
      await fetch(`${api_url()}sala-presencial`,{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(salapres)
      }).then(Resposta =>{
        if (!Resposta.ok){
            throw new Error("Seu Cadastro não foi realizado!") 
        }
        console.log(Resposta.ok)
      })
    })

    setModalCadastro(false);
    navigate('/');
  }

  return (
    <>
      <div className="mt-2 p-1">

        {/* botões que alteram o formulário da sala - presencial e virtual */}
        <div id="button_form_salas" className="flex pl-4 justify-start gap-5">
          <p className="pt-[1.5px] text-lg font-medium ">
          Cadastrar sala:
          </p>

          <button type="button" className="border p-1 px-3 rounded-lg shadow-md "
          onClick={()=>setSelectedButton('Virtual')}>
            Virtual
          </button>
        
          <button type="button" className="border p-1 px-3 rounded-lg shadow-md"
          onClick={()=>setSelectedButton('Presencial')}>
            Presencial
          </button>
        </div>


        {/* formulários (presencial e virtual) e lista de cadastros */}
        <div id="form_salas" className=" mt-4 flex flex-wrap justify-around">
          <div className="border p-5 px-11 ">

            {/* form - sala virtual */}
            {(selectedButton==='Virtual') && (
              <form className="flex flex-col  ">
                <label className="font-bold text-xl flex-auto mb-2">Virtual</label>

                <div className=" p-1 gap-2 flex justify-between">
                  <label className="bg-transparent font-semibold">Identificação:</label>
                  <input type="text" className="bg-transparent border border-gray-400 rounded pl-1"
                  value={identVirtual} onChange={(e)=>setIdentVirtual(e.target.value)}/>
                </div>

                <div className=" p-1 flex justify-between">
                  <label className="font-semibold">Permissão:</label>
                  <select className="bg-transparent border border-gray-400 rounded w-[57.8%]"
                  value={permissaoVirtual} onChange={(e)=>setPermissaoVirtual(e.target.value)}>
                    <option value={""}>Selecione</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>                  
                </select>
                </div>

                <div className="p-1 flex justify-between">
                  <label className="font-semibold">Login:</label>
                  <input type="text" className="bg-transparent border border-gray-400 rounded pl-1 "
                  value={login} onChange={(e)=>setLogin(e.target.value)}/>
                </div>

                <div className="p-1 flex justify-between">
                  <label className="font-semibold">Senha:</label>
                  <input type="text" className="bg-transparent border border-gray-400 rounded pl-1"
                  value={senha} onChange={(e)=>setSenha(e.target.value)}/>
                </div>

              </form>
            )}

            {/* form - sala presencial */}
            {(selectedButton==='Presencial')&&(
              <form className="flex flex-col  ">
              <label className="font-bold text-xl flex-auto mb-2">Presencial</label>

              <div className=" p-1 gap-2 flex justify-between">
                <label className="font-semibold">Identificação:</label>
                <input type="text" className="bg-transparent border border-gray-400 rounded pl-1"
                value={identPresencial} onChange={(e)=>setIdentPresencial(e.target.value)}/>
              </div>

              <div className=" p-1 flex justify-between">
                <label className="font-semibold">Permissão:</label>
                <select className="bg-transparent border border-gray-400 rounded w-[57.8%]"
                value={permissaoPresencial} onChange={(e)=>setPermissaoPresencial(e.target.value)}>
                  <option value={""}>Selecione</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>                  
                </select>
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Endereço:</label>
                <input type="text" className="bg-transparent border border-gray-400 rounded pl-1"
                value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Local:</label>
                <input type="text" className="bg-transparent border border-gray-400 rounded pl-1"
                value={local} onChange={(e)=>setLocal(e.target.value)}/>
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Ocupação máx:</label>
                <input type="number" className="bg-transparent border border-gray-400 rounded pl-1"
                value={ocupacaoMax} onChange={(e)=>setOcupacaoMax(e.target.value)}/>
              </div>
            </form>
            )}

            {/* botões - limpar campos do formulário e adicionar novo elem. à lista */}
            <div className="flex-auto space-x-8 mt-4">
              <button type="button"
              className="border p-1 px-3 rounded-lg shadow-sm bg-gray-100"
              onClick={handleCleanForm}
              >
                Limpar campos
              </button>
              <button type="button"
              className="border p-1 px-3 rounded-lg shadow-sm bg-gray-100"
              onClick={handleAddSalas}
              >
                Adicionar outra sala</button>
            </div>            
            
          </div>

            {/* Listas de cadastro - registro de todas as salas adicionadas pelo formulário */}
          <div className="mt-2 border border-gray-300 flex flex-col h-64 overflow-y-auto w-80 overflow-x-auto">
            <div>
              <label>Listas de Cadastro</label>
            </div>

            <hr />
            {(salaPresencial.length>0) &&
              <label className="underline">Salas Presenciais:</label>
            }
            {salaPresencial.map((sala,index)=>(
              <div 
              key={index}
              className="flex flex-row justify-around"
              >
                  <label className="flex flex-auto justify-center">{sala.identificacao}</label>
                  <button type="button" className="my-1 border"><MdDelete onClick={()=>handleDeleteItemPresencial(sala)}/></button>
              </div>
            ))}

            <hr />
            {(salaVirtual.length>0) &&
              <label className="underline">Salas Virtuais:</label>
            }
            {salaVirtual.map((sala,index)=>(
              <div key={index} className="flex flex-row justify-around">
                  <label className="flex flex-auto justify-center">{sala.identificacao}</label>
                  <button type="button" className="my-1 border" onClick={()=>handleDeleteItemVirtual(sala)}><MdDelete /></button>
              </div>
            ))}

          </div>

        </div>
        
        <div className="flex justify-center gap-5 mt-8">
          {/* Botões para excluir e cadastrar as listas de salas presenciais e virtuais */}

            {/* Botão para Excluir as listas de salas presenciais e virtuais */}
            <button type="button" 
            className="border p-1 rounded-xl bg-red-500" 
            onClick={()=>setModalDelete(true)}
            >
              Excluir lista
            </button>

            {modalDelete && (
              <ConfirmationModal 
              message="Excluir os cadastros?" cancelText="Não" confirmText="Sim" 
              onCancel={()=>setModalDelete(false)} 
              onConfirm={handleDeleteList}
              />
            )}

            {/* Botão para Cadastrar ambas as listas */}
            <button type="button"
            className="border p-1 rounded-xl bg-yellow-400"
            onClick={()=>setModalCadastro(true)}
            >
              Cadastrar
            </button>

            {modalCadastro && (
              <ConfirmationModal
              message="Cadastrar salas?" cancelText="Não" confirmText="Sim"
              onCancel={()=>setModalCadastro(false)}
              onConfirm={handlePostList}
              />
            )}
        </div>
      </div>
    </>
  )
}

export default CadSala;
