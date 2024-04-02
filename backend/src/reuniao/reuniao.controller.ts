import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao-presencial.dto';

@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService) {}

  @Post()
  create(@Body() createReuniaoDto: CreateReuniaoDto) {
    return this.reuniaoService.criarReuniaoPresencial(createReuniaoDto);
  }

  @Get()
  findAll() {
    return this.reuniaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reuniaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReuniaoDto: CreateReuniaoDto) {
    return this.reuniaoService.update(+id, updateReuniaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reuniaoService.remove(+id);
  }
}
