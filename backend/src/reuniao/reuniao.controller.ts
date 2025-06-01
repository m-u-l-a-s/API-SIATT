import { Controller, Get, Post, Body, Param, Delete, Put, StreamableFile, Res, Req, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { ReuniaoAnexosService } from 'src/reuniao-anexos/reuniao-anexos.service';
import * as fs from 'fs'
import * as path from 'path'
import { join } from 'path';
import { Axios, AxiosResponse, HttpStatusCode } from 'axios';
import { ServerResponse } from 'http';
import { Response } from 'express';

interface UserRequest {
  email: string
}

@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService,
    private readonly reuniaoAnexoService: ReuniaoAnexosService) { }

  @Post("agendar")
  async create(@Body() createReuniaoDto: CreateReuniaoDto) {
    return await this.reuniaoService.createReuniao(createReuniaoDto);
  }

  @Get()
  async findAll() {
    return await this.reuniaoService.find()
  }

  @Get("presencial")
  findAllPresencial() {
    return this.reuniaoService.findAllPresencial();
  }

  @Get("presencial/:email")
  findAllPresencialByEmail(@Param("email") email: string) {
    return this.reuniaoService.findAllPresencialByEmail(email);
  }

  @Get("virtual")
  findAllOnline() {
    return this.reuniaoService.findAllOnline();
  }

  @Get("virtual/:email")
  findAllVirtualByEmail(@Param("email") email: string) {
    return this.reuniaoService.findAllOnlineByEmail(email);
  }

  @Get("hibrida")
  findAllHibrido() {
    return this.reuniaoService.findAllHibrido();
  }

  @Get("hibrida/:email")
  findAllHibridoByEmail(@Param("email") email: string) {
    return this.reuniaoService.findAllHibridoByEmail(email);
  }

  @Get(":email")
  async findAllByEmail(@Param("email") email: string) {
    return await this.reuniaoService.findAllByEmail(email);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.reuniaoService.findOne(id);
  }

  @Get('/dataDia/:dataDia')
  async findAllByDate(@Param('dataDia') dataDia: string) {
    return await this.reuniaoService.findAllByDate(dataDia);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reuniaoDTO: CreateReuniaoDto, @Req() req: Request) {
    let token: string = ""
    if (req.headers["authorization"] !== undefined && req.headers["authorization"] !== "") {
      token = req.headers["authorization"]
    }
    return this.reuniaoService.update(id, reuniaoDTO, token);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    this.reuniaoAnexoService.excluirAnexos(id)
    let token: string = ""
    if (req.headers["authorization"] !== undefined && req.headers["authorization"] !== "") {
      token = req.headers["authorization"]
    }
    try {
      await this.reuniaoService.remove(id, token);
      return res.status(HttpStatusCode.NoContent).json({})
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return res.status(HttpStatusCode.Unauthorized).json({ message: err.message })
      }

      if (err instanceof NotFoundException) {
        return res.status(HttpStatusCode.NotFound).json({ message: err.message })
      }

      if (err instanceof BadRequestException) {
        return res.status(HttpStatusCode.BadRequest).json({ message: err.message })
      }
    }
  }

  @Get("ata/:id")
  getAta(@Param("id") id: string, @Res() res: ServerResponse) {
    const filePath = path.join(join(process.cwd(), `/atas/${id}/ATA_REUNIAO.docx`));
    const fileName = `ATA_REUNIAO.docx`;
    const fileStream: fs.ReadStream = fs.createReadStream(filePath)
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    fileStream.pipe(res);

  }

  @Post("ata/:id")
  async createAta(
    @Param("id") id: string,
    @Body() data: CreateReuniaoDto
  ) {
    return await this.reuniaoService.createAta(id, data)
  }
}
