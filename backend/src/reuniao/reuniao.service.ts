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
    const reuniao : ReuniaoEntity = await this.reuniaoRepository.findOneBy({id : id});
    if (reuniao) {
      try {
        reuniao.titulo = reuniaoDTO.titulo;
        reuniao.categoria = reuniaoDTO.categoria;
        reuniao.dataHora = reuniaoDTO.dataHora;
        reuniao.duracao = reuniaoDTO.duracao;
        reuniao.pauta = reuniaoDTO.pauta;
        reuniao.participantes = reuniaoDTO.participantes;

        if (reuniaoDTO.presencial !== "") {
          try {
            reuniao.salaPresencial = await this.salaPresencialService.findOne(reuniaoDTO.presencial)
          } catch (error) {
            console.log(error)
          }
        }

        if (reuniaoDTO.virtual !== "") {
          try {
            reuniao.salaVirtual = await this.salaVirtualService.findOne(reuniaoDTO.virtual);
          } catch (error) {
            console.log(error)
          }
        }
          
        try {
          reuniao.solicitante = await this.usuarioService.findOneByEmail(reuniaoDTO.solicitanteEmail);
        } catch (error) {
            console.log(error)
        }
        
        return await this.reuniaoRepository.save(reuniao);
      } catch (error) {
        console.log(error)
      }
    }
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

  async findAllPresencialByEmail(email : string) {
    const query = `SELECT * FROM reuniao r
    INNER JOIN usuario u ON u.id = r.solicitanteId 
    WHERE r.categoria = 'fisica' AND u.email =  '${email}' OR 
    r.categoria = 'fisica' AND JSON_CONTAINS(r.participantes ,'"${email}"');`
    return this.reuniaoRepository.query(query);
  }

  async findAllOnlineByEmail(email : string) {
    const query = `SELECT * FROM reuniao r
    INNER JOIN usuario u ON u.id = r.solicitanteId 
    WHERE r.categoria = 'virtual' AND u.email =  '${email}' OR 
    r.categoria = 'virtual' AND JSON_CONTAINS(r.participantes ,'"${email}"');`
    return this.reuniaoRepository.query(query);
  }

  async findAllHibridoByEmail(email : string) {
    const query = `SELECT * FROM reuniao r
    INNER JOIN usuario u ON u.id = r.solicitanteId 
    WHERE r.categoria = 'hibrida' AND u.email =  '${email}' OR 
    r.categoria = 'hibrida' AND JSON_CONTAINS(r.participantes ,'"${email}"');`
    return this.reuniaoRepository.query(query);
  }

  async findAllByEmail(email: string) {
    const user = await this.usuarioService.findOneByEmail(email);
    const query = `SELECT * FROM  reuniao re 
    WHERE JSON_CONTAINS(participantes ,'"${email}"') OR re.solicitanteId = "${user.id}";`;
    return await this.reuniaoRepository.query(query)
  }

  async findOne(id: string) {
    const query = `select * from reuniao r where r.id = '${id}';`;
    return await this.reuniaoRepository.query(query)
  }

  async findAllByDate(dataDia: string){
    const query : string = `SELECT * FROM reuniao r where r.dataHora between '${dataDia} 00:00:00' and '${dataDia} 23:59:59';`
    return await this.reuniaoRepository.query(query);
  }

  remove(id: string) {
    const reuniao = this.reuniaoRepository.findOneBy({ id: id });
    if (reuniao) {
      return this.reuniaoRepository.delete({ id: id })
    }
    return
  }

  async find(){
    return await this.reuniaoRepository.find();
  }
}
