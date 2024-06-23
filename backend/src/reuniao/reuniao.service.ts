import { HttpCode, Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria, ReuniaoEntity } from './entities/reuniao.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';

@Injectable()
export class ReuniaoService {

  constructor(
    @InjectRepository(ReuniaoEntity)
    private readonly reuniaoRepository: Repository<ReuniaoEntity>,
    private readonly usuarioService: UsuarioService,
    private readonly salaPresencialService: SalaPresencialService,
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

  async criarReuniaoFisica(reuniao: ReuniaoEntity, reuniaoDTO: CreateReuniaoDto) {
    const salaPresencial: SalaPresencialEntity = await this.salaPresencialService.findOne(reuniaoDTO.presencial)
    if (salaPresencial.ocupacaoMax < reuniaoDTO.participantes.lenght) {
      throw new Error("Número de participantes excede a ocupação máxima da sala")
    }
    reuniao.salaPresencial = salaPresencial;
  }

  async createReuniao(reuniaoDTO: CreateReuniaoDto) {
    const reuniao = await this.criarReuniaoEntity(reuniaoDTO)

    if (reuniao.solicitante == null) {
      throw new Error("Solicitante não encontrado");
    }

    switch (reuniaoDTO.categoria) {
      case Categoria.FISICA:
        await this.criarReuniaoFisica(reuniao, reuniaoDTO)
        reuniao.joinUrl = ""
        break;

      case Categoria.HIBRIDA:
        await this.criarReuniaoFisica(reuniao, reuniaoDTO)
        reuniao.joinUrl = reuniaoDTO.joinUrl
        break;

      case Categoria.VIRTUAL:
        reuniao.joinUrl = reuniaoDTO.joinUrl
        break;

      default:
        throw new Error("Nenhuma tipo de reunião foi selecionado")
    }

    return await this.reuniaoRepository.save(reuniao)
  }

  async update(id: string, reuniaoDTO: CreateReuniaoDto) {
    const reuniao: ReuniaoEntity = await this.reuniaoRepository.findOneBy({ id: id });
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

  async findAllPresencialByEmail(email: string) {
    const query = `SELECT * FROM reuniao r
    INNER JOIN usuario u ON u.id = r.solicitanteId 
    WHERE r.categoria = 'fisica' AND u.email =  '${email}' OR 
    r.categoria = 'fisica' AND JSON_CONTAINS(r.participantes ,'"${email}"');`
    return this.reuniaoRepository.query(query);
  }

  async findAllOnlineByEmail(email: string) {
    const query = `SELECT * FROM reuniao r
    INNER JOIN usuario u ON u.id = r.solicitanteId 
    WHERE r.categoria = 'virtual' AND u.email =  '${email}' OR 
    r.categoria = 'virtual' AND JSON_CONTAINS(r.participantes ,'"${email}"');`
    return this.reuniaoRepository.query(query);
  }

  async findAllHibridoByEmail(email: string) {
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



  remove(id: string) {
    const reuniao = this.reuniaoRepository.findOneBy({ id: id });
    if (reuniao) {
      return this.reuniaoRepository.delete({ id: id })
    }
    return
  }

  async find() {
    return await this.reuniaoRepository.find();
  }
}
