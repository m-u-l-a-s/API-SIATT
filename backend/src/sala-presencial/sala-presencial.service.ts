import { Injectable } from '@nestjs/common';
import { CreateSalaPresencialDto } from './dto/create-sala-presencial.dto';

@Injectable()
export class SalaPresencialService {
  create(createSalaPresencialDto: CreateSalaPresencialDto) {
    return 'This action adds a new salaPresencial';
  }

  findAll() {
    return `This action returns all salaPresencial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaPresencial`;
  }

  update(id: number, updateSalaPresencialDto: CreateSalaPresencialDto) {
    return `This action updates a #${id} salaPresencial`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaPresencial`;
  }
}
