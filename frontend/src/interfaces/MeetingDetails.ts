export interface MeetingDetailProps {
    // key: string;
    id: string;
    title: string;
    desc: string;
    date: string;
    time: string;
    duracao: number;
    place: string;
    salaPresencial: string | null;
    salaVirtual: string | null;
    idSolicitante: string;
    idUsuario: string | undefined
    participantes: string[]
}