 import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReuniaoAnexosService } from './reuniao-anexos.service';
import { CreateReuniaoAnexoDto } from './dto/create-reuniao-anexo.dto';

@Controller('reuniao-anexos')
export class ReuniaoAnexosController {
  constructor(private readonly reuniaoAnexosService: ReuniaoAnexosService) {}

  @Post()
  create(@Body() createReuniaoAnexoDto: CreateReuniaoAnexoDto) {
    return this.reuniaoAnexosService.create(createReuniaoAnexoDto);
  }

  @Get()
  findAll() {
    return this.reuniaoAnexosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reuniaoAnexosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReuniaoAnexoDto:  CreateReuniaoAnexoDto) {
    return this.reuniaoAnexosService.update(+id, updateReuniaoAnexoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reuniaoAnexosService.remove(+id);
  }
}
