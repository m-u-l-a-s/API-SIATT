
export interface CreateReuniao {
    id ?: string
    titulo: string | undefined
    categoria: Categoria | string | undefined
    dataHora: Date | undefined
    duracao: number | undefined
    pauta: string | undefined
    salapresencial ?: string | undefined
    joinUrl ?: string
    solicitanteEmail: string | undefined
    participantes: any | undefined
    AtaUrl ?: string
}

export enum Categoria {
    VIRTUAL = "virtual",
    PRESENCIAL = "fisica",
    HIBRIDA = "hibrida"
}