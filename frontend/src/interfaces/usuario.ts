export interface IUsuario {
    user : any
    id ?: string
    login : string
    email : string
    senha : string
    departamento : DEPARTAMENTO
    permissao : number
    status : number   
    admin : boolean
}

export enum DEPARTAMENTO{
    FINANCEIRO="financeiro",
    COMERCIAL="comercial",
    TECNICO="tecnico",
    ADMINISTRATIVO="administrativo"
}