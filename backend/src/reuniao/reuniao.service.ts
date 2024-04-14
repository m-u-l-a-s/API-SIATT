import { HttpCode, Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria, ReuniaoEntity } from './entities/reuniao.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { SalaVirtualService } from 'src/sala-virtual/sala-virtual.service';

@Injectable()
export class ReuniaoService {

  constructor(
    @InjectRepository(ReuniaoEntity)
    private readonly reuniaoRepository: Repository<ReuniaoEntity>,
    private readonly usuarioService: UsuarioService,
    private readonly salaPresencialService: SalaPresencialService,
    private readonly salaVirtualService: SalaVirtualService
  ) { }

  async criarReuniaoEntity(reuniaoDTO: CreateReuniaoDto): Promise<ReuniaoEntity> {
    const reuniao = new ReuniaoEntity();
    reuniao.titulo = reuniaoDTO.titulo;
    reuniao.categoria = reuniaoDTO.categoria;
    reuniao.dataHora = reuniaoDTO.dataHora;
    reuniao.duracao = reuniaoDTO.duracao;
    reuniao.pauta = reuniaoDTO.pauta;
    reuniao.participantes = reuniaoDTO.participantes;
    try {
      reuniao.solicitante = await this.usuarioService.findOneByEmail(reuniaoDTO.solicitanteEmail);
    } catch (error) {
      reuniao.solicitante = null
    }
    return reuniao
  }

  async createReuniao(reuniaoDTO: CreateReuniaoDto) {
    const reuniao = await this.criarReuniaoEntity(reuniaoDTO)

    if (reuniao.solicitante == null) {
      return "Solicitante não encontrado"
    }

    try {
      if (reuniaoDTO.virtual !== null) { reuniao.salaVirtual = await this.salaVirtualService.findOne(reuniaoDTO.virtual) }
      if (reuniaoDTO.presencial !== null) {
        reuniao.salaPresencial = await this.salaPresencialService.findOne(reuniaoDTO.presencial)
      }
      if (reuniao.salaPresencial !== null && reuniaoDTO.participantes.lenght > reuniao.salaPresencial.ocupacaoMax) {
        return "O numero de participantes excede o tamanho da sala"
      }
      return await this.reuniaoRepository.save(reuniao);
    } catch (error) {
      return error.message
    }
  }

  async update(id: string, reuniaoDTO: CreateReuniaoDto) {
    const reuniao = await this.findOne(id);
    if (reuniao) {
      reuniao.titulo = reuniaoDTO.titulo;
      reuniao.categoria = reuniaoDTO.categoria;
      reuniao.dataHora = reuniaoDTO.dataHora;
      reuniao.duracao = reuniaoDTO.duracao;
      reuniao.pauta = reuniaoDTO.pauta;
      reuniao.participantes = reuniaoDTO.participantes;
      if (reuniaoDTO.presencial !== null) { reuniao.salaPresencial = await this.salaPresencialService.findOne(reuniaoDTO.presencial) }
      if (reuniaoDTO.virtual !== null ) { reuniao.salaVirtual = await this.salaVirtualService.findOne(reuniaoDTO.virtual); }
      reuniao.solicitante = await this.usuarioService.findOneByEmail(reuniaoDTO.solicitanteEmail);
      
      return await this.reuniaoRepository.update(id, reuniao);
    }
    return
  }

  async findAllPresencial() {
    const query = "SELECT * FROM reuniao WHERE categoria = 'fisica';"
    return this.reuniaoRepository.query(query);
  }

  async findAllOnline() {
    const query = "SELECT * FROM reuniao WHERE categoria = 'virtual';"
    return this.reuniaoRepository.query(query);
  }

  async findAllHibrido() {
    const query = "SELECT * FROM reuniao WHERE categoria = 'hibrida';"
    return this.reuniaoRepository.query(query);
  }

  async findAllByEmail(email: string) {
    const user = await this.usuarioService.findOneByEmail(email);
    const query = `SELECT * FROM  reuniao re 
    WHERE JSON_CONTAINS(participantes ,'"${email}"') OR re.solicitanteId = "${user.id}";`;
    return await this.reuniaoRepository.query(query)
  }

  async findOne(id: string) {
    return this.reuniaoRepository.findOneBy({ id: id });
  }



  remove(id: string) {
    const reuniao = this.reuniaoRepository.findOneBy({ id: id });
    if (reuniao) {
      return this.reuniaoRepository.delete({ id: id })
    }
    return
  }
}
