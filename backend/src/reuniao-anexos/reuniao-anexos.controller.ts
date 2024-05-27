import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, StreamableFile } from '@nestjs/common';
import { ReuniaoAnexosService } from './reuniao-anexos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';
import { bodyFile } from './dto/anexo.dto';
import * as fs from 'fs'
import { join } from 'path';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { ReuniaoAnexo } from './entities/reuniao-anexo.entity';

@Controller('reuniao-anexos')
export class ReuniaoAnexosController {
  constructor(private readonly reuniaoAnexosService: ReuniaoAnexosService) { }

  @Post("upload/:email")
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadAnexo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: bodyFile,
    @Param('email') email: string,
    @Req() req: Request
  ) {
    return this.reuniaoAnexosService.salvarArquivo(req, body.reuniaoId, file);
  }

  @Get("reuniao/:idReuniao")
  async getAnexosByReuniao(
    @Param('idReuniao') idReuniao: string
  ) : Promise<ReuniaoAnexo[]> {
    return this.reuniaoAnexosService.getAnexos(idReuniao)
  }

  @Get(":email/:arquivo")
  getAnexo(
    @Param('email') email: string,
    @Param('arquivo') arquivo: string
  ): StreamableFile {
    const file: fs.ReadStream = fs.createReadStream(join(process.cwd(), `/anexos/${email}/${arquivo}`));
    return new StreamableFile(file);
  }
}
