
export interface CreateReuniao {
    titulo: string | undefined
    categoria: Categoria | undefined
    dataHora: Date | undefined
    duracao: number | undefined
    pauta: string | undefined
    presencial ?: string | undefined
    virtual ?: string | undefined
    solicitanteEmail: string | undefined
    participantes: any | undefined
}

export enum Categoria {
    VIRTUAL = "virtual",
    PRESENCIAL = "fisica",
    HIBRIDA = "hibrida"
}