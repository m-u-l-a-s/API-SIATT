import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateReuniaoDto } from "src/reuniao/dto/create-reuniao.dto";
import { Categoria, ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";
import { ReuniaoService } from "src/reuniao/reuniao.service";
import { CreateSalaPresencialDto } from "src/sala-presencial/dto/create-sala-presencial.dto";
import { SalaPresencialEntity } from "src/sala-presencial/entities/sala-presencial.entity";
import { SalaPresencialService } from "src/sala-presencial/sala-presencial.service";
import { CreateSalaVirtualDto } from "src/sala-virtual/dto/create-sala-virtual.dto";
import { SalaVirtualEntity } from "src/sala-virtual/entities/sala-virtual.entity";
import { SalaVirtualService } from "src/sala-virtual/sala-virtual.service";
import { CreateUsuarioDto, DEPARTAMENTO } from "src/usuario/dto/create-usuario.dto";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { Repository } from "typeorm";

@Injectable()
export class MockDataBase {

    salaPresencialService : SalaPresencialService
    salaVirtualService : SalaVirtualService
    usuarioService : UsuarioService
    reuniaoService : ReuniaoService

    constructor(
        @InjectRepository(SalaPresencialEntity)
        private readonly salaPresencial: Repository<SalaPresencialEntity>,

        @InjectRepository(SalaVirtualEntity)
        private readonly salaVirtual: Repository<SalaVirtualEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuario : Repository<UsuarioEntity>,

        @InjectRepository(ReuniaoEntity)
        private readonly reuniao : Repository<ReuniaoEntity>
        
        ) { 
            this.salaPresencialService = new SalaPresencialService(salaPresencial, reuniao);
            this.salaVirtualService = new SalaVirtualService(salaVirtual);
            this.usuarioService = new UsuarioService(usuario);
            this.reuniaoService = new ReuniaoService(reuniao,this.usuarioService, this.salaPresencialService, this.salaVirtualService);
        }

    async isEmpty(): Promise<void> {
        const countPresencial = await this.salaPresencial.count();
        if (countPresencial == 0) { await this.createTestDataSalaPresencial() }

        const countVirtual = await this.salaVirtual.count();
        if (countVirtual == 0) { await this.createTestDataSalaVirtual()}

        const countUser = await this.usuario.count();
        if (countUser == 0) { await this.createTestDataUser()}

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

    async createTestDataSalaVirtual(): Promise<void> {
        for (let index = 1; index < 11; index++) {
            const reuniao = new CreateSalaVirtualDto();
            reuniao.identificacao = `Sala ${index}`
            reuniao.login = "admin"
            reuniao.senha = "fatec"
            reuniao.permissao = 1;
            await this.salaVirtualService.create(reuniao)
        }
    }

    async createTestDataUser(): Promise<void> {
        const nomes = ['claudia','mateus','jonas','alexandre','joice','alicea','vitor']
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
        const reuniaoService = new ReuniaoService(this.reuniao,this.usuarioService,this.salaPresencialService,this.salaVirtualService);

        const salaPrincipal = await this.salaPresencialService.findAll();
        const salaVirtual = await this.salaVirtualService.findAll();

        const reuniao1 = new CreateReuniaoDto()
        reuniao1.titulo = `Reunião com o time de Desenvolvimento`
        reuniao1.pauta = `Conferir o progresso do novo realease`
        reuniao1.categoria = Categoria.FISICA
        reuniao1.dataHora = new Date(2024,5,29,10,30,0)
        reuniao1.duracao = 60
        reuniao1.solicitanteEmail = "mateus@gmail.com"
        reuniao1.participantes = JSON.parse(`["claudia@gmail.com","jonas@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao1.presencial = salaPrincipal[0].id

        await reuniaoService.createReuniao(reuniao1);

        const reuniao2 = new CreateReuniaoDto()
        reuniao2.titulo = `Reunião com o cliente SIATT`
        reuniao2.pauta = `Apresentação do produto final`
        reuniao2.categoria = Categoria.FISICA
        reuniao2.dataHora = new Date(2024,5,25,9,30,0)
        reuniao2.duracao = 40
        reuniao2.solicitanteEmail = "claudia@gmail.com"
        reuniao2.participantes = JSON.parse(`["mateus@gmail.com","jonas@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao2.presencial = salaPrincipal[1].id

        await reuniaoService.createReuniao(reuniao2);

        const reuniao3 = new CreateReuniaoDto()
        reuniao3.titulo = `Reunião com o cliente IONIC`
        reuniao3.pauta = `Apresentação da nova CZAR BOMB brasileira`
        reuniao3.categoria = Categoria.FISICA
        reuniao3.dataHora = new Date(2024,11,31,20,30,0)
        reuniao3.duracao = 240
        reuniao3.solicitanteEmail = "jonas@gmail.com"
        reuniao3.participantes = JSON.parse(`["mateus@gmail.com","claudia@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao3.presencial = salaPrincipal[2].id

        await reuniaoService.createReuniao(reuniao3);

        const reuniao4 = new CreateReuniaoDto()
        reuniao4.titulo = `Reunião com clientes da CHINA`
        reuniao4.pauta = `Apresentação do projeto CBOMB`
        reuniao4.categoria = Categoria.VIRTUAL
        reuniao4.dataHora = new Date(2024,7,25,14,10,0)
        reuniao4.duracao = 50
        reuniao4.solicitanteEmail = "jonas@gmail.com"
        reuniao4.participantes = JSON.parse(`["xingiping@gmail.com","mateus@gmail.com","claudia@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao4.virtual = salaVirtual[2].id

        await reuniaoService.createReuniao(reuniao4);

        const reuniao5 = new CreateReuniaoDto()
        reuniao5.titulo = `Daily CBOMB`
        reuniao5.pauta = `Daily do projeto CBOMB`
        reuniao5.categoria = Categoria.VIRTUAL
        reuniao5.dataHora = new Date(2024,7,14,14,10,0)
        reuniao5.duracao = 50
        reuniao5.solicitanteEmail = "mateus@gmail.com"
        reuniao5.participantes = JSON.parse(`["jonas@gmail.com","claudia@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao5.virtual = salaVirtual[1].id

        await reuniaoService.createReuniao(reuniao5);

        const reuniao6 = new CreateReuniaoDto()
        reuniao6.titulo = `Daily CBOMB`
        reuniao6.pauta = `Daily do projeto CBOMB`
        reuniao6.categoria = Categoria.HIBRIDA
        reuniao6.dataHora = new Date(2024,7,15,14,10,0)
        reuniao6.duracao = 50
        reuniao6.solicitanteEmail = "mateus@gmail.com"
        reuniao6.participantes = JSON.parse(`["jonas@gmail.com","claudia@gmail.com","alexandre@gmail.com","joice@gmail.com","alicea@gmail.com","vitor@gmail.com"]`)
        reuniao6.virtual = salaVirtual[1].id
        reuniao6.presencial = salaPrincipal[2].id

        await reuniaoService.createReuniao(reuniao6);
    }

} 