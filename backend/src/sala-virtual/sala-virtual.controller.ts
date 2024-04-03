import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaVirtualService } from './sala-virtual.service';
import { CreateSalaVirtualDto } from './dto/create-sala-virtual.dto';

@Controller('sala-virtual')
export class SalaVirtualController {
  constructor(private readonly salaVirtualService: SalaVirtualService) {}

  @Post()
  create(@Body() createSalaVirtualDto: CreateSalaVirtualDto) {
    return this.salaVirtualService.create(createSalaVirtualDto);
  }

  @Get()
  findAll() {
    return this.salaVirtualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaVirtualService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaVirtualDto: CreateSalaVirtualDto) {
    return this.salaVirtualService.update(id, updateSalaVirtualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaVirtualService.remove(id);
  }
}
