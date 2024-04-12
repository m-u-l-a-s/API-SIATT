import { HttpCode, Injectable } from '@nestjs/common';
import { CreateSalaPresencialDto } from './dto/create-sala-presencial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaPresencialEntity } from './entities/sala-presencial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaPresencialService {
  constructor(
    @InjectRepository(SalaPresencialEntity)
    private readonly salaPresencialRepository: Repository<SalaPresencialEntity>
  ) { }

  async create(salaPresencialDto: CreateSalaPresencialDto) {
    return this.salaPresencialRepository.save(salaPresencialDto);
  }

  findAll() {
    return this.salaPresencialRepository.find();
  }

  findOne(id: string) {
    return this.salaPresencialRepository.findOneBy({ id: id });
  }

  async update(id: string, updateSalaPresencialDto: CreateSalaPresencialDto) {
    const salaUpdate = await this.salaPresencialRepository.findOneBy({ id: id });
    if (salaUpdate != null) {
      salaUpdate.identificacao = updateSalaPresencialDto.identificacao;
      salaUpdate.local = updateSalaPresencialDto.local;
      salaUpdate.ocupacaoMax = updateSalaPresencialDto.ocupacaoMax;
      salaUpdate.permissao = updateSalaPresencialDto.permissao;
      return await this.salaPresencialRepository.save(salaUpdate);
    }

    else {
      return HttpCode(404);
    }
  }

  async remove(id: string) {
    const salaRemove = await this.salaPresencialRepository.findOneBy({id : id});
    if (salaRemove != null){
      return await this.salaPresencialRepository.remove(salaRemove);
    }
    else {
      return HttpCode(404);
    }
  }
}
