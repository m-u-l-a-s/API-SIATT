import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { ReuniaoAnexosService } from 'src/reuniao-anexos/reuniao-anexos.service';

interface UserRequest{
  email : string
}

@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService,
    private readonly reuniaoAnexoService: ReuniaoAnexosService) {}

  @Post("agendar")
  async create(@Body() createReuniaoDto : CreateReuniaoDto){
    return await this.reuniaoService.createReuniao(createReuniaoDto);
  }

  @Get()
  async findAll(){
    return await this.reuniaoService.find()
  }

  @Get("presencial")
  findAllPresencial() {
    return this.reuniaoService.findAllPresencial();
  }

  @Get("presencial/:email")
  findAllPresencialByEmail(@Param("email") email : string) {
    return this.reuniaoService.findAllPresencialByEmail(email);
  }

  @Get("virtual")
  findAllOnline(){
    return this.reuniaoService.findAllOnline();
  }

  @Get("virtual/:email")
  findAllVirtualByEmail(@Param("email") email : string) {
    return this.reuniaoService.findAllOnlineByEmail(email);
  }

  @Get("hibrida")
  findAllHibrido(){
    return this.reuniaoService.findAllHibrido();
  }

  @Get("hibrida/:email")
  findAllHibridoByEmail(@Param("email") email : string) {
    return this.reuniaoService.findAllHibridoByEmail(email);
  }

  @Get(":email")
  async findAllByEmail(@Param("email") email : string ){
    return await this.reuniaoService.findAllByEmail(email);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.reuniaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reuniaoDTO: CreateReuniaoDto) {
    return this.reuniaoService.update(id, reuniaoDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.reuniaoAnexoService.excluirAnexos(id)
    return this.reuniaoService.remove(id);
  }
}
