import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
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
      console.log(`resposta: `, response.data)
      return response.data;
  }

  async createMeeting(data: ZoomMeetingDto, token) {
    const options = {
      method: 'POST',
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      data: {
        type: 2,
        agenda: data.agenda,
        topic: data.topic,
        duration: data.duration,
        start_time: data.start_time,
        timezone: "America/Sao_Paulo",
        settings: {
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
        },
      }
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      return data
    } catch (error) {
      console.error(error);
      return error
    }
  }

  async deleteMeeting(meeting_id : string, token: string){
    const options:  AxiosRequestConfig = {
      url: `https://api.zoom.us/v2/meetings/${meeting_id}`,
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      method: "DELETE",
    };

    try {
      const { data } = await axios.request(options)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
