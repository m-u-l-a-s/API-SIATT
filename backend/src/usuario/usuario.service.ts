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

  async create(createUsuarioDto: CreateUsuarioDto) {   
    const usuario = new UsuarioEntity();
    usuario.login = createUsuarioDto.email
    usuario.departamento = createUsuarioDto.departamento
    usuario.email = createUsuarioDto.email
    usuario.permissao = createUsuarioDto.permissao
    usuario.status = createUsuarioDto.status
    await usuario.setSenha(createUsuarioDto.senha)
    return this.clienteRepository.save(usuario);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: string) {
    return this.clienteRepository.findOneBy({id: id});
  }

  async findOneByEmail(email : string) {
    return await this.clienteRepository.findOneBy({email: email});
  }

  update(id: string, user: CreateUsuarioDto) {
      return this.clienteRepository.update(id, 
        {
          email: user.email,
          login: user.login,
          departamento: user.departamento,
          permissao: user.permissao,
          status: user.status
        })
    
  }

  remove(id: string) {
    return this.clienteRepository.delete({id: id});
  }
}
