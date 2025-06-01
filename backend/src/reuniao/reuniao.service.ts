import { HttpCode, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria, ReuniaoEntity } from './entities/reuniao.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';
import { patchDocument, PatchType, Paragraph } from 'docx';
import * as path from 'path';
import * as fs from 'fs'
import { ZoomService } from 'src/zoom/zoom.service';
import { HttpStatusCode } from 'axios';

@Injectable()
export class ReuniaoService {

  constructor(
    @InjectRepository(ReuniaoEntity)
    private readonly reuniaoRepository: Repository<ReuniaoEntity>,
    private readonly usuarioService: UsuarioService,
    private readonly salaPresencialService: SalaPresencialService,
    private readonly zoomServico: ZoomService,
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
    if (salaPresencial.ocupacaoMax < reuniaoDTO.participantes.length) {
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
        reuniao.zoomMeetingId = ""
        break;

      case Categoria.HIBRIDA:
        await this.criarReuniaoFisica(reuniao, reuniaoDTO)
        reuniao.joinUrl = reuniaoDTO.joinUrl
        reuniao.zoomMeetingId = `${reuniaoDTO.zommMeetingId}`
        break;

      case Categoria.VIRTUAL:
        reuniao.joinUrl = reuniaoDTO.joinUrl
        reuniao.zoomMeetingId = `${reuniaoDTO.zommMeetingId}`
        break;

      default:
        throw new Error("Nenhuma tipo de reunião foi selecionado")
    }

    return await this.reuniaoRepository.save(reuniao)
  }

  formatarData(date): string {
    const dataString = date.substring(0, 10)
    const dia = dataString.split("-")[2]
    const mes = dataString.split("-")[1]
    const ano = dataString.split("-")[0]
    return `${dia}-${mes}-${ano}`
  }

  formatarHora(date): string {
    return date.substring(11, 16)
  }


  async createAta(id: string, reuniao: CreateReuniaoDto) {
    const pastaReuniao = path.join("./atas", id)
    const modeloAta = path.join("modelo_ata/ATA_DE_REUNIAO.docx")

    if (!fs.existsSync(pastaReuniao)) {
      fs.mkdirSync(pastaReuniao, { recursive: true })
    }

    const ataReuniao = `${pastaReuniao}/ATA_REUNIAO.docx`

    let local = ''

    if (reuniao.joinUrl) {
      local = reuniao.joinUrl
    } else {
      local = (await this.salaPresencialService.findOne(reuniao.presencial)).local
    }

    let participantes = JSON.stringify(reuniao.participantes).replace("[", "")
    participantes = participantes.replace("]", "")
    participantes = participantes.trim()
    const participantesList: string[] = participantes.split(",")


    const doc = await patchDocument(fs.readFileSync(modeloAta), {
      patches: {
        RPC_PROGRAMA_AREA: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: reuniao.titulo }),
          ],
        },
        RPC_ASSUNTO: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: reuniao.pauta }),
          ],
        },

        RPC_DATA: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: this.formatarData(reuniao.dataHora) }),
          ],
        },

        RPC_HORARIO: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: this.formatarHora(reuniao.dataHora) }),
          ],
        },

        RPC_LOCAL: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: local }),
          ],
        },

        RPC_RELATOR: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({ text: reuniao.solicitanteEmail }),
          ],
        },

        RPC_PARTICIPANTES: {
          type: PatchType.DOCUMENT,
          children: participantesList.map(participante => {
            const data = participante.replace(`"`, ``).replace(`"`, ``)
            return new Paragraph({ text: data });
          }),
        },
      },
    }
    );
    fs.writeFileSync(ataReuniao, doc);

    const reuniaoData: ReuniaoEntity = await this.reuniaoRepository.findOneBy({ id: id })

    reuniaoData.AtaUrl = `${process.env.BACKEND_URL}/reuniao/ata/${id}`

    console.log(reuniaoData.AtaUrl)

    return await this.reuniaoRepository.save(reuniaoData)
  }

  async update(id: string, reuniaoDTO: CreateReuniaoDto, token?: string) {
    const reuniao: ReuniaoEntity = await this.reuniaoRepository.findOneBy({ id: id });
    if (reuniao) {
      if (reuniao.categoria == Categoria.HIBRIDA || reuniao.categoria == Categoria.VIRTUAL) {
        if (!token) {
          throw new UnauthorizedException("Token inválido ou vazio!")
        }
        reuniaoDTO.dataHora = new Date(reuniaoDTO.dataHora)
        const respZoom = await this.zoomServico.updateMeeting(reuniaoDTO, token)
        if (!(respZoom.status == 204)) {
          throw new Error("Erro ao atualizar reunião")
        }
      }

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

  async findAllByDate(dataDia: string) {
    const query: string = `SELECT * FROM reuniao r where r.dataHora between '${dataDia} 00:00:00' and '${dataDia} 23:59:59';`
    return await this.reuniaoRepository.query(query);
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
