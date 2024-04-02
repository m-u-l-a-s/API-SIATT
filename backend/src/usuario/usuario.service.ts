import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private clienteRepository : Repository<UsuarioEntity>
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {    
    return this.clienteRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: string) {
    return this.clienteRepository.findOneBy({id: id});
  }

  update(id: string, user: CreateUsuarioDto) {
      return this.clienteRepository.update(id, 
        {
          email: user.email,
          login: user.login,
          diretoria: user.diretoria,
          permissao: user.permissao,
          status: user.status
        })
    
  }

  remove(id: string) {
    return this.clienteRepository.delete({id: id});
  }
}
