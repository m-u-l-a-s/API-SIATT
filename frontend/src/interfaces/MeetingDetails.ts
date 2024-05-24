export interface MeetingDetailProps {
    id: string;
    title: string;
    desc: string;
    date: string;
    time: string;
    duracao: number;
    place: string;
    login: string;
    password: string;
    sala: string;
    idSolicitante : string;
    idUsuario : string | undefined
    participantes : string[]
}