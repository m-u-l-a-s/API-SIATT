import { useEffect, useState } from "react";
import { TextField } from "../components/TextInput";
import { NumberField } from "../components/NumberField";
import { useLocation, useNavigate } from "react-router-dom";
import SalaDetails from "../components/SalaDetails";
import api from "../services/api";




interface SalaProps {
    id: string,
    identificacao: string,
    endereco: string,
    permissao: number,
    ocupacaoMax: number,
    local: string
}



export function EditarSala (){

    const [id, setId] = useState<string>('');

    const [identificacao, setIdentificacao] = useState<string>('');

    const [endereco, setEndereco] = useState<string>('');

    const [permissao, setPermissao] = useState<number>(0);

    const [ocupacaoMax, setOcupacaoMax] = useState<number>(0);

    const [local, setLocal] = useState<string>('');

    const location = useLocation();

    const navigate = useNavigate();

    useEffect (() => {
        if (location.state && location.state.key){
            const sala: SalaProps = location.state.key
            setIdentificacao(sala.identificacao);
            setEndereco(sala.endereco);
            setPermissao(sala.permissao);
            setOcupacaoMax(sala.ocupacaoMax);
            setLocal(sala.local)
        }else{

        }

        
    }, [location.state]);

    const atualizarSala = async () => {
        const id = location.state.key.id
        const data : SalaProps = {
            id: id,
            identificacao: identificacao,
            endereco: endereco,
            permissao: permissao,
            ocupacaoMax: ocupacaoMax,
            local: local
        }
        await api.put(`sala-presencial/${id}`, data).then(resp => {
            navigate ('/home/ListarCadastrados')
        }).catch(error => {console.log(error)})
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center mt-4 space-x-52 ">
        <TextField nome="Identificação: " setValue={setIdentificacao} value={identificacao}></TextField>
        <TextField nome="Endereço: " setValue={setEndereco} value={endereco}></TextField>
        <NumberField nome="Permissão: " setValue={setPermissao} value={permissao}></NumberField>
        <NumberField nome="Ocupação Máxima: " setValue={setOcupacaoMax} value={ocupacaoMax}></NumberField>
        <TextField nome="Local: " setValue={setLocal} value={local}></TextField>
        
        <button className="btnAmarelos mt-4" onClick={atualizarSala}> Atualizar </button>
        </div>
        </>
    )
}