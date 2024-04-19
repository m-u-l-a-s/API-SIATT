export class CreateUsuarioDto 
{
    id ?: string
    login : string
    senha : string
    email : string
    diretoria : boolean
    permissao : number
    status : number   
}