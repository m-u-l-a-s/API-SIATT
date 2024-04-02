import { Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao-presencial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReuniaoEntity } from './entities/reuniao.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { ParticipantesEntity } from './entities/participantes.entity';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';

@Injectable()
export class ReuniaoService {

  constructor(
    @InjectRepository(ReuniaoEntity)
    private readonly reuniaoRepository: Repository<ReuniaoEntity>
  ) { }


  async criarReuniaoPresencial(reuniaoDTO: CreateReuniaoDto) {
    // const solicitante = await this.usuarioRepository.findOneBy({ id: reuniaoDTO.solicitante.id })
    // const reuniao = new ReuniaoEntity()
    // reuniao.titulo = reuniaoDTO.titulo
    // reuniao.pauta = reuniaoDTO.pauta
    // reuniao.categoria = reuniaoDTO.categoria
    // reuniao.dataHora = reuniaoDTO.dataHora
    // reuniao.duracao = reuniaoDTO.duracao
    // reuniao.solicitante = solicitante

    // try {
    //   reuniao.salaPresencial = await this.salaPresencialRepository.findOneBy({id : reuniaoDTO.presencial})
    // } catch (error) {
    //   return "Sala presencial não existe"
    // }

    // const reuniaoCriada = await this.reuniaoRepository.save(reuniao)

    // reuniaoDTO.participantes.map(participante => {
    //     const part = new ParticipantesEntity()
    //     part.email = participante.email
    //     part.nome = participante.nome
    //     part.reuniaoId = reuniaoCriada
    //     this.participanteRepository.save(part)
    // })
  }

  findAll() {
    return `This action returns all reuniao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reuniao`;
  }

  update(id: number, updateReuniaoDto: CreateReuniaoDto) {
    return `This action updates a #${id} reuniao`;
  }

  remove(id: number) {
    return `This action removes a #${id} reuniao`;
  }
}
