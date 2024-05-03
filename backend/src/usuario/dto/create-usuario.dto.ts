export class CreateUsuarioDto 
{
    id ?: string
    login : string
    senha : string
    email : string
    departamento : DEPARTAMENTO
    permissao : number
    status : number   
}

export enum DEPARTAMENTO{
    FINANCEIRO="financeiro",
    COMERCIAL="comercial",
    TECNICO="tecnico",
    ADMINISTRATIVO="administrativo"
}