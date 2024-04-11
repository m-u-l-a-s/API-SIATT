import { Injectable } from '@nestjs/common';
import { CreateReuniaoAnexoDto } from './dto/create-reuniao-anexo.dto';

@Injectable()
export class ReuniaoAnexosService {
  create(createReuniaoAnexoDto: CreateReuniaoAnexoDto) {
    return 'This action adds a new reuniaoAnexo';
  }

  findAll() {
    return `This action returns all reuniaoAnexos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reuniaoAnexo`;
  }

  update(id: number, updateReuniaoAnexoDto: CreateReuniaoAnexoDto) {
    return `This action updates a #${id} reuniaoAnexo`;
  }

  remove(id: number) {
    return `This action removes a #${id} reuniaoAnexo`;
  }
}
