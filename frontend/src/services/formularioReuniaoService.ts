import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { CreateReuniaoDto, CreateReuniaoZoomDto, CreateReuniaoZoomResponse } from "../types/formularioReuniao";
import { authService } from "./services.auth";
import { Categoria } from "../interfaces/CreateReuniaoDto";
import api from "./api";
import { UnauthorizedError } from "../errors/HttpErros";


export const  CriarReuniaoNoZoom = async (reuniaoZoom : CreateReuniaoZoomDto) => {
    const options : AxiosRequestConfig = {
        headers: {
            Authorization: `${authService.getZoomToken()}`
        }
    }
    const response = await axios.post("http://localhost:3000/zoom/schedule", reuniaoZoom, options)

    return response
}



export const CriarReuniao = async (reuniao : CreateReuniaoDto) => {
    if  (reuniao.categoria == Categoria.HIBRIDA ||  reuniao.categoria == Categoria.VIRTUAL){
        const resposta = await CriarReuniaoNoZoom({
            agenda: reuniao.pauta,
            duration: reuniao.duracao,
            meeting_invites: reuniao.participantes,
            start_time: reuniao.dataHora.toISOString(),
            topic: reuniao.titulo 
        })

        if (resposta.status == HttpStatusCode.Unauthorized) {
            throw new UnauthorizedError("Token Expired")        
        }

        if (resposta.status == HttpStatusCode.Created) {
            const data : CreateReuniaoZoomResponse = resposta.data
            reuniao.joinUrl = data.join_url
            reuniao.zommMeetingId = data.id
        }
        if (reuniao.categoria == Categoria.VIRTUAL) {
            reuniao.presencial = ""
        }
    }

    const resp = await axios.post("http://localhost:3000/reuniao/agendar", reuniao)
    return resp
}

export const salvarAta = async (id : string, reuniao : CreateReuniaoDto) => {
    const resp = await api.post(`reuniao/ata/${id}`, reuniao)
    if (resp.status != HttpStatusCode.Ok) {
        throw new Error("Erro ao criar ata")
    }
}


export interface FileWithId {
    id: string;
    file: File;
}

export const salvarArquivos = async (idReuniao: string, files : FileWithId[]) => {
    for (let anexo of files) {
        const formData = new FormData;
        formData.append("file", anexo.file)
        formData.append("reuniaoId", idReuniao)

        
        const resp = await api.post(`reuniao-anexos/upload/${authService.decodificarToken(authService.getToken())}`, formData);
        if (resp.status != HttpStatusCode.Ok) {
            throw new Error("Erro ao salvar arquivo")
        }
    }
}