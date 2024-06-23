import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { SrvRecord } from 'dns';


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
    usuario.admin = createUsuarioDto.admin
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

  async update(id: string, user: CreateUsuarioDto) {
      const userAtual = await this.findOne(id)
      userAtual.admin = user.admin
      userAtual.login = user.login
      userAtual.email = user.email
      userAtual.departamento = user.departamento
      userAtual.permissao = user.permissao
      userAtual.status = user.status
      return await this.clienteRepository.update(id,userAtual)
  }

  remove(id: string) {
    return this.clienteRepository.delete({id: id});
  }
}
