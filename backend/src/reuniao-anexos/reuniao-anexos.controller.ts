import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ReuniaoAnexosService } from './reuniao-anexos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';
import { bodyFile } from './dto/anexo.dto';

@Controller('reuniao-anexos')
export class ReuniaoAnexosController {
  constructor(private readonly reuniaoAnexosService: ReuniaoAnexosService) { }

  @Post("upload/:email")
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadAnexo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: bodyFile,
    @Param('email') email : string,
    @Req() req: Request
  ) {
    return this.reuniaoAnexosService.salvarArquivo(req, body.reuniaoId, file);
  }
}
