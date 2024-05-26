import { Categoria } from "../pages/FormularioReuniao"

export interface ReuniaoPresencialDTO {
    titulo : string
    categoria : Categoria
    dataHora : Date
    duracao : number
    pauta : string
    presencial : string
    virtual : string
    solicitanteEmail : string
    participantes : any
}