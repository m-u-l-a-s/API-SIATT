import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReuniaoDto } from "src/reuniao/dto/create-reuniao.dto";
import { Categoria, ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";
import { ReuniaoService } from "src/reuniao/reuniao.service";
import { CreateSalaPresencialDto } from "src/sala-presencial/dto/create-sala-presencial.dto";
import { SalaPresencialEntity } from "src/sala-presencial/entities/sala-presencial.entity";
import { SalaPresencialService } from "src/sala-presencial/sala-presencial.service";
import { CreateUsuarioDto, DEPARTAMENTO } from "src/usuario/dto/create-usuario.dto";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { Repository } from "typeorm";

@Injectable()
export class MockDataBase {

    salaPresencialService: SalaPresencialService
    usuarioService: UsuarioService
    reuniaoService: ReuniaoService

    constructor(
        @InjectRepository(SalaPresencialEntity)
        private readonly salaPresencial: Repository<SalaPresencialEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuario: Repository<UsuarioEntity>,

        @InjectRepository(ReuniaoEntity)
        private readonly reuniao: Repository<ReuniaoEntity>

    ) {
        this.salaPresencialService = new SalaPresencialService(salaPresencial, reuniao);
        this.usuarioService = new UsuarioService(usuario);
        this.reuniaoService = new ReuniaoService(reuniao, this.usuarioService, this.salaPresencialService);
    }

    async isEmpty(): Promise<void> {
        const countPresencial = await this.salaPresencial.count();
        if (countPresencial == 0) { await this.createTestDataSalaPresencial() }

        const countUser = await this.usuario.count();
        if (countUser == 0) { await this.createTestDataUser() }

        const countReuniaoPresencial = await this.reuniao.count()
        if (countReuniaoPresencial == 0) { await this.createTestDataReuniao() }
    }

    async createTestDataSalaPresencial(): Promise<void> {
        for (let index = 1; index < 11; index++) {
            const reuniao = new CreateSalaPresencialDto();
            reuniao.identificacao = `Sala ${400 + index}`
            reuniao.local = `Centro Comercial 2`
            reuniao.endereco = `PIT - Parque de Inovação Tecnológica São José dos Campos`;
            reuniao.ocupacaoMax = 10;
            reuniao.permissao = 1;
            await this.salaPresencialService.create(reuniao)
        }
    }

    async createTestDataUser(): Promise<void> {
        const nomes = ['claudia', 'mateus', 'jonas', 'alexandre', 'joice', 'alicea', 'vitor']
        for (let index = 0; index < 7; index++) {
            const user = new CreateUsuarioDto()
            user.departamento = DEPARTAMENTO.TECNICO
            user.email = `${nomes[index]}@gmail.com`
            user.senha = `fatec`
            user.login = nomes[index]
            user.permissao = 3
            user.status = 1
            user.admin = true
            await this.usuarioService.create(user)
        }
    }

    async createTestDataReuniao(): Promise<void> {
        const reuniaoService = new ReuniaoService(this.reuniao, this.usuarioService, this.salaPresencialService);
        
        const salaPrincipal = await this.salaPresencialService.findAll();

        const reuniao1 = new CreateReuniaoDto()
        reuniao1.titulo = `Reunião com o time de Desenvolvimento`
        reuniao1.pauta = `Conferir o progresso do novo realease`
        reuniao1.categoria = Categoria.FISICA
        reuniao1.dataHora = new Date(2024, 5, 29, 10, 30, 0)
        reuniao1.duracao = 60
        reuniao1.solicitanteEmail = "mateus@gmail.com"
        reuniao1.participantes = JSON.parse(`["claudia@gmail.com","jonas@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao1.presencial = salaPrincipal[0].id
        reuniao1.joinUrl = ""

        await reuniaoService.createReuniao(reuniao1);

        const reuniao2 = new CreateReuniaoDto()
        reuniao2.titulo = `Reunião com o cliente SIATT`
        reuniao2.pauta = `Apresentação do produto final`
        reuniao2.categoria = Categoria.FISICA
        reuniao2.dataHora = new Date(2024, 5, 25, 9, 30, 0)
        reuniao2.duracao = 40
        reuniao2.solicitanteEmail = "claudia@gmail.com"
        reuniao2.participantes = JSON.parse(`["mateus@gmail.com","jonas@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao2.presencial = salaPrincipal[1].id
        reuniao2.joinUrl = ""

        await reuniaoService.createReuniao(reuniao2);

        const reuniao3 = new CreateReuniaoDto()
        reuniao3.titulo = `Reunião com o cliente IONIC`
        reuniao3.pauta = `Apresentação da nova CZAR BOMB brasileira`
        reuniao3.categoria = Categoria.FISICA
        reuniao3.dataHora = new Date(2024, 11, 31, 20, 30, 0)
        reuniao3.duracao = 240
        reuniao3.solicitanteEmail = "jonas@gmail.com"
        reuniao3.participantes = JSON.parse(`["mateus@gmail.com","claudia@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao3.presencial = salaPrincipal[2].id
        reuniao3.joinUrl = ""

        await reuniaoService.createReuniao(reuniao3);
    }
} 