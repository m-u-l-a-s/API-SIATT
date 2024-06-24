import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';  // Adicione esta linha
import { ZoomMeetingDto, ZoomSettings } from './dto/creatoZoomMeeting.dto';


@Injectable()
export class ZoomService {

    private generateBasicAuthHeader(): string {
        const credentials = `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
        const encodedCredentials = Buffer.from(credentials).toString('base64')
        return `Basic ${encodedCredentials}`
    }

    async getToken(code: string) {
        const credential = this.generateBasicAuthHeader();
        const response = await axios.post("https://zoom.us/oauth/token",
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:5173/zoom',
            }),
            {
                headers: {
                    Authorization: credential,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        )
        console.log(`resposta: `, response)
        return response.data;
    }

    async createMeeting(data: ZoomMeetingDto, token) {
        const settings: ZoomSettings = {
            host_video: true,
            participant_video: true,
            join_before_host: true,
            mute_upon_entry: true,
            watermark: false,
            use_pmi: false,
            approval_type: 0,
            audio: 'both',
            auto_recording: 'none',
            meeting_invites: data.meeting_invites
        }

        const response = await axios.post(`https://api.zoom.us/v2/users/me/meetings`,
            {
                topic: data.topic,
                agenda: data.agenda,
                type: 2,
                start_time: data.start_time,
                duration: data.duration,
                settings: settings,
                timezone: "America/Sao Paulo"
            },
            {
                headers: {
                    'Authorization': token,
                    'User-Agent': 'Zoom-api-Jwt-Request',
                    'content-type': 'application/json'
                }
            }
        )
        return await response.data
    }
}
