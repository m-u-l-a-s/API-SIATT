import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto"
import { Categoria } from "../entities/reuniao.entity"
import { ParticipanteDto } from "./participate-reuniao.dto"
import { CreateSalaPresencialDto } from "src/sala-presencial/dto/create-sala-presencial.dto"

export class CreateReuniaoDto 
{
    titulo : string
    categoria : Categoria
    dataHora : Date
    duracao : number
    pauta : string
    presencial : string
    solicitante : CreateUsuarioDto
    participantes : ParticipanteDto[]
}


