import { HttpCode, Injectable } from '@nestjs/common';
import { CreateSalaVirtualDto } from './dto/create-sala-virtual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalaVirtualEntity } from './entities/sala-virtual.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaVirtualService {
  constructor(
    @InjectRepository(SalaVirtualEntity)
    readonly salaVirtualRepository : Repository<SalaVirtualEntity>
  ){

  }
  async create(createSalaVirtualDto: CreateSalaVirtualDto) {
    const sala = new SalaVirtualEntity()
    sala.identificacao = createSalaVirtualDto.identificacao
    sala.login = createSalaVirtualDto.login
    sala.senha = createSalaVirtualDto.senha
    sala.permissao = createSalaVirtualDto.permissao
    return await this.salaVirtualRepository.save(sala);
  }

  findAll() {
    return this.salaVirtualRepository.find();
  }

  findOne(id: string){
    return this.salaVirtualRepository.findOneBy({id : id});
  }

  async update(id: string, updateSalaVirtualDto: CreateSalaVirtualDto) {
    const sala = await this.salaVirtualRepository.findOneBy({id : id});
    if (sala != null){
      sala.identificacao = updateSalaVirtualDto.identificacao
      sala.login = updateSalaVirtualDto.login
      sala.senha = updateSalaVirtualDto.senha
      sala.permissao = updateSalaVirtualDto.permissao
      return this.salaVirtualRepository.save(sala)
    }
    else{
      return HttpCode(404)
    }
    
  }

  async remove(id: string) {
    const sala = await this.salaVirtualRepository.findOneBy({id : id});
    if (sala != null){
      return this.salaVirtualRepository.remove(sala)
    }
    else{
      return HttpCode(404)
    }
  }
}
