import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao-presencial.dto';

interface UserRequest{
  email : string
}

@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService) {}

  @Post("presencial")
  createReuniaoPresencial(@Body() createReuniaoDto: CreateReuniaoDto) {
    return this.reuniaoService.criarReuniaoPresencial(createReuniaoDto);
  }

  @Get("presencial")
  findAllPresencial() {
    return this.reuniaoService.findAllPresencial();
  }

  @Get("virtual")
  findAllOnline(){
    return this.reuniaoService.findAllOnline();
  }

  @Get("hibrida")
  findAllHibrido(){
    return this.reuniaoService.findAllHibrido();
  }

  @Get("user")
  async findAllByEmail(@Body() user : UserRequest){
    return await this.reuniaoService.findAllByEmail(user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reuniaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() reuniaoDTO: CreateReuniaoDto) {
    return this.reuniaoService.updatePresencial(id, reuniaoDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reuniaoService.remove(id);
  }
}
