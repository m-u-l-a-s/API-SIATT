import { HttpCode, Injectable } from '@nestjs/common';
import { CreateSalaPresencialDto } from './dto/create-sala-presencial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaPresencialEntity } from './entities/sala-presencial.entity';
import { Repository } from 'typeorm';
import { ReuniaoEntity } from 'src/reuniao/entities/reuniao.entity';
import { privateDecrypt } from 'crypto';

@Injectable()
export class SalaPresencialService {
  constructor(
    @InjectRepository(SalaPresencialEntity)
    private readonly salaPresencialRepository: Repository<SalaPresencialEntity>,
    @InjectRepository(ReuniaoEntity)
    private readonly reuniaoRepository : Repository<ReuniaoEntity>
  ) { }

  async create(salaPresencialDto: CreateSalaPresencialDto) {
    return this.salaPresencialRepository.save(salaPresencialDto);
  }

  async findAll(): Promise<SalaPresencialEntity[]> {
    return await this.salaPresencialRepository.find();
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
    const salaPresencial : SalaPresencialEntity = await this.salaPresencialRepository.findOneBy({id:id})

    salaPresencial

    const reunioes : ReuniaoEntity[] = await this.reuniaoRepository.findBy({salaPresencial : salaPresencial })

    reunioes

    for (let reuniao of reunioes) {
      await this.reuniaoRepository.delete({id: reuniao.id})
    }
    return await this.salaPresencialRepository.delete(id)
  }
}
