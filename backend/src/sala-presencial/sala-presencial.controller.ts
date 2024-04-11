import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SalaPresencialService } from './sala-presencial.service';
import { CreateSalaPresencialDto } from './dto/create-sala-presencial.dto';

@Controller('sala-presencial')
export class SalaPresencialController {
  constructor(private readonly salaPresencialService: SalaPresencialService) {}

  @Post()
  create(@Body() createSalaPresencialDto: CreateSalaPresencialDto) {
    return this.salaPresencialService.create(createSalaPresencialDto);
  }

  @Get()
  findAll() {
    return this.salaPresencialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaPresencialService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSalaPresencialDto: CreateSalaPresencialDto) {
    return this.salaPresencialService.update(id, updateSalaPresencialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaPresencialService.remove(id);
  }
}
