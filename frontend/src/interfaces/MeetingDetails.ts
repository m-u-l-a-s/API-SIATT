import { Categoria } from "./CreateReuniaoDto";

export interface MeetingDetailProps {
    // key: string;
    id: string;
    titulo: string;
    pauta: string;
    date: string;
    time: string;
    duracao: number;
    categoria : Categoria | string
    salaPresencial: string | null;
    idSolicitante: string;
    idUsuario: string | undefined
    participantes: string[]
    joinUrl ?: string | null
}