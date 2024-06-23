import { Categoria } from "../entities/reuniao.entity"

export class CreateReuniaoDto 
{
    titulo : string
    categoria : Categoria
    dataHora : Date
    duracao : number
    pauta : string
    joinUrl ?: string
    presencial ?: string
    solicitanteEmail : string
    participantes : any
}


