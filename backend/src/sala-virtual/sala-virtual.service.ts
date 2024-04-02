import { Injectable } from '@nestjs/common';
import { CreateSalaVirtualDto } from './dto/create-sala-virtual.dto';

@Injectable()
export class SalaVirtualService {
  create(createSalaVirtualDto: CreateSalaVirtualDto) {
    return 'This action adds a new salaVirtual';
  }

  findAll() {
    return `This action returns all salaVirtual`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaVirtual`;
  }

  update(id: number, updateSalaVirtualDto: CreateSalaVirtualDto) {
    return `This action updates a #${id} salaVirtual`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaVirtual`;
  }
}
