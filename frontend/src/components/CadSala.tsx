import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { api_url } from "../variables";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface salaPresencialCad {
  identificacao: string;
  endereco: string;
  permissao: number;
  ocupacaoMax: number;
  local: string;
}

const CadSala = () => {
  //const - modais para deletar e cadastrar listas
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  // const - elem. formulário presencial
  const [identPresencial, setIdentPresencial] = useState<string>("");
  const [permissaoPresencial, setPermissaoPresencial] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [ocupacaoMax, setOcupacaoMax] = useState<string>("0");
  const [local, setLocal] = useState<string>("");

  //const - listas salas presenciais e virtuais
  const [salaPresencial, setSalaPresencial] = useState<salaPresencialCad[]>([]);

  //const - use navigate
  const navigate = useNavigate();

  //função limpar campos dos formulários
  const handleCleanForm = () => {
    setIdentPresencial("");
    setPermissaoPresencial("0");
    setEndereco("");
    setOcupacaoMax("0");
    setLocal("");
  };

  // função para limpar lista de cadastros
  const handleDeleteList = () => {
    setSalaPresencial([]);
    setModalDelete(false);
  };

  const validarDados = (): string => {
    let erros: string = "";
    if (identPresencial == "") {
      erros += "Campo identificação deve estar preenchido.\n";
    }
    if (permissaoPresencial == "") {
      erros += "Campo permissão deve estar preenchido.\n";
    }
    if (endereco == "") {
      erros += "Campo endereço deve estar preenchido.\n";
    }
    if (local == "") {
      erros += "Campo local deve estar preenchido.\n";
    }
    if (Number(ocupacaoMax) <= 0) {
      erros +=
        "Campo ocupação máxima deve ser maior de 0 deve estar preenchido.\n";
    }
    return erros;
  };

  //função adicionar salas na lista de cadastro
  const handleAddSalas = (event: React.MouseEvent) => {
    const erros: string = validarDados();
    if (erros != "") {
      alert(erros);
      return;
    }

    event.preventDefault();
    const novaSalaPresencial: salaPresencialCad = {
      identificacao: identPresencial,
      endereco,
      permissao: Number(permissaoPresencial),
      ocupacaoMax: Number(ocupacaoMax),
      local,
    };
    setSalaPresencial([...salaPresencial, novaSalaPresencial]);
    console.log(salaPresencial);
    handleCleanForm();
  };

  //função p/excluir item único da lista de cadastro
  const handleDeleteItemPresencial = (itemToExclude: salaPresencialCad) => {
    const updateItem = salaPresencial.filter((item) => item !== itemToExclude);
    setSalaPresencial(updateItem);
  };

  //função para cadastrar as listas
  const handlePostList = async () => {
    if(salaPresencial.length == 0) {
            alert("Não há salas para cadastrar!")
            return
    }
    salaPresencial.forEach(async (salapres) => {
      await fetch(`${api_url()}sala-presencial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salapres),
      }).then((Resposta) => {
        if (!Resposta.ok) {
          throw new Error("Seu Cadastro não foi realizado!");
        }
        console.log(Resposta.ok);
      });
    });

    setModalCadastro(false);
    navigate("/");
  };

  return (
    <>
      <div className="mt-2 p-1">
        {/* formulários (presencial e virtual) e lista de cadastros */}
        <div id="form_salas" className=" mt-4 flex flex-wrap justify-around">
          <div className="border p-5 px-11 ">
            <form className="flex flex-col  ">
              <label className="font-bold text-xl flex-auto mb-2">
                Presencial
              </label>

              <div className=" p-1 gap-2 flex justify-between">
                <label className="font-semibold">Identificação:</label>
                <input
                  type="text"
                  className="text-base-content bg-transparent border border-gray-400 rounded pl-1"
                  value={identPresencial}
                  onChange={(e) => setIdentPresencial(e.target.value)}
                />
              </div>

              <div className=" p-1 flex justify-between">
                <label className="font-semibold">Permissão:</label>
                <select
                  className="bg-transparent border border-gray-400 rounded w-[57.8%]"
                  value={permissaoPresencial}
                  onChange={(e) => setPermissaoPresencial(e.target.value)}
                >
                  <option value={""}>Selecione</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Endereço:</label>
                <input
                  type="text"
                  className="text-base-content bg-transparent border border-gray-400 rounded pl-1"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Local:</label>
                <input
                  type="text"
                  className="text-base-content bg-transparent border border-gray-400 rounded pl-1"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </div>

              <div className="p-1 flex justify-between">
                <label className="font-semibold">Ocupação máx:</label>
                <input
                  type="number"
                  className="bg-transparent border border-gray-400 rounded pl-1"
                  value={ocupacaoMax}
                  onChange={(e) => setOcupacaoMax(e.target.value)}
                />
              </div>
            </form>

            {/* botões - limpar campos do formulário e adicionar novo elem. à lista */}
            <div className="flex-auto space-x-8 mt-4">
              <button
                type="button"
                className="border p-1 px-3 rounded-lg shadow-sm bg-gray-100"
                onClick={handleCleanForm}
              >
                Limpar campos
              </button>
              <button
                type="button"
                className="border p-1 px-3 rounded-lg shadow-sm bg-gray-100"
                onClick={handleAddSalas}
              >
                Adicionar outra sala
              </button>
            </div>
          </div>

          {/* Listas de cadastro - registro de todas as salas adicionadas pelo formulário */}
          <div className="mt-2 border border-gray-300 flex flex-col h-64 overflow-y-auto w-80 overflow-x-auto">
            <div>
              <label>Listas de Cadastro</label>
            </div>

            <hr />
            {salaPresencial.length > 0 && (
              <label className="underline">Salas Presenciais:</label>
            )}
            {salaPresencial.map((sala, index) => (
              <div key={index} className="flex flex-row justify-around">
                <label className="flex flex-auto justify-center">
                  {sala.identificacao}
                </label>
                <button type="button" className="my-1 border">
                  <MdDelete onClick={() => handleDeleteItemPresencial(sala)} />
                </button>
              </div>
            ))}

            <hr />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-8">
          {/* Botões para excluir e cadastrar as listas de salas presenciais e virtuais */}

          {/* Botão para Excluir as listas de salas presenciais e virtuais */}
          <button
            type="button"
            className="border p-1 rounded-xl bg-red-500"
            onClick={() => setModalDelete(true)}
          >
            Excluir lista
          </button>

          {modalDelete && (
            <ConfirmationModal
              message="Excluir os cadastros?"
              cancelText="Não"
              confirmText="Sim"
              onCancel={() => setModalDelete(false)}
              onConfirm={handleDeleteList}
            />
          )}

          {/* Botão para Cadastrar ambas as listas */}
          <button
            type="button"
            className="border p-1 rounded-xl bg-yellow-400"
            onClick={() => setModalCadastro(true)}
          >
            Cadastrar
          </button>

          {modalCadastro && (
            <ConfirmationModal
              message="Cadastrar salas?"
              cancelText="Não"
              confirmText="Sim"
              onCancel={() => setModalCadastro(false)}
              onConfirm={handlePostList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CadSala;
