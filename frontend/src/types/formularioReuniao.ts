import { Categoria } from "../interfaces/CreateReuniaoDto"

export interface CreateReuniaoDto 
{
    titulo : string
    categoria : Categoria
    dataHora : Date
    duracao : number
    pauta : string
    joinUrl ?: string
    presencial ?: string
    solicitanteEmail : string
    participantes : string[]
    AtaUrl ?: string
    zommMeetingId ?: number
}


export interface CreateReuniaoZoomDto {
    topic : string,
    agenda : string,
    start_time : string
    duration : number
    meeting_invites : string[]
}
  
export interface CreateReuniaoZoomResponse {
    assistant_id: string;
    host_email: string;
    id: number;
    registration_url: string;
    agenda: string;
    created_at: string;
    duration: number;
    encrypted_password: string;
    pstn_password: string;
    h323_password: string;
    join_url: string;
    chat_join_url: string;
    password: string;
    pmi: string;
    pre_schedule: boolean;
    start_time: string;
    start_url: string;
    timezone: string;
    topic: string;
    type: number;
    dynamic_host_key: string;
    creation_source: string;
  }