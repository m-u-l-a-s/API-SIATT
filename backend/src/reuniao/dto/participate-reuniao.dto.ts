import { ReuniaoEntity } from "../entities/reuniao.entity"

export class ParticipanteDto{
    nome : string
    email : string
    reuniao : ReuniaoEntity
}