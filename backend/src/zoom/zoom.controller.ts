import { Body, Controller, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { ZoomMeetingDto } from './dto/creatoZoomMeeting.dto';
import { Request } from 'express';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @HttpCode(200)
  @Post('/token/:code')
  async getToken(@Param('code') code: string) {
    return await this.zoomService.getToken(code);
  }

  @Post('/schedule')
  async screduleMeeting(
    @Body() body : ZoomMeetingDto,
    @Req() req : Request
  ){
    const authorization = req.headers['authorization'];
    return await this.zoomService.createMeeting(body, authorization)
  }
}
