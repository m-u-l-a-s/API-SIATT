import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReuniaoEntity } from "src/reuniao/entities/reuniao.entity";
import { ReuniaoService } from "src/reuniao/reuniao.service";
import { CreateSalaPresencialDto } from "src/sala-presencial/dto/create-sala-presencial.dto";
import { SalaPresencialEntity } from "src/sala-presencial/entities/sala-presencial.entity";
import { SalaPresencialService } from "src/sala-presencial/sala-presencial.service";
import { CreateSalaVirtualDto } from "src/sala-virtual/dto/create-sala-virtual.dto";
import { SalaVirtualEntity } from "src/sala-virtual/entities/sala-virtual.entity";
import { SalaVirtualService } from "src/sala-virtual/sala-virtual.service";
import { CreateUsuarioDto } from "src/usuario/dto/create-usuario.dto";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { Repository } from "typeorm";

@Injectable()
export class MockDataBase {
    constructor(
        @InjectRepository(SalaPresencialEntity)
        private readonly salaPresencial: Repository<SalaPresencialEntity>,

        @InjectRepository(SalaVirtualEntity)
        private readonly salaVirtual: Repository<SalaVirtualEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuario : Repository<UsuarioEntity>,

        @InjectRepository(ReuniaoEntity)
        private readonly reuniao : Repository<ReuniaoEntity>
        
        ) { }

    async isEmpty(): Promise<void> {
        const countPresencial = await this.salaPresencial.count();
        if (countPresencial == 0) { await this.createTestDataSalaPresencial() }

        const countVirtual = await this.salaVirtual.count();
        if (countVirtual == 0) { await this.createTestDataSalaVirtual()}

        const countUser = await this.usuario.count();
        if (countUser == 0) { await this.createTestDataUser()}
    }

    async createTestDataSalaPresencial(): Promise<void> {
        const salaPresencialService = new SalaPresencialService(this.salaPresencial);
        for (let index = 1; index < 11; index++) {
            const reuniao = new CreateSalaPresencialDto();
            reuniao.identificacao = `Sala ${400 + index}`
            reuniao.local = `Centro Comercial 2`
            reuniao.ocupacaoMax = 10;
            reuniao.permissao = 1;
            await salaPresencialService.create(reuniao)
        }
    }

    async createTestDataSalaVirtual(): Promise<void> {
        const salaVirtualService = new SalaVirtualService(this.salaVirtual);
        for (let index = 1; index < 11; index++) {
            const reuniao = new CreateSalaVirtualDto();
            reuniao.identificacao = `Sala ${index}`
            reuniao.login = "admin"
            reuniao.senha = "fatec"
            reuniao.permissao = 1;
            await salaVirtualService.create(reuniao)
        }
    }

    async createTestDataUser(): Promise<void> {
        const usuarioService = new UsuarioService(this.usuario);
        const nomes = ['claudia','mateus','jonas','alexandre','joice','alicea','vitor']
        for (let index = 0; index < 7; index++) {
            const user = new CreateUsuarioDto()
            user.diretoria = true
            user.email = `${nomes[index]}@gmail.com`
            user.login = nomes[index]
            user.permissao = 3
            user.status = 1
            await usuarioService.create(user)
        }
    }

    async createTestDataReuniao(): Promise<void> {
        const usuarioService = new UsuarioService(this.usuario);
        const salaPresencialService = new SalaPresencialService(this.salaPresencial);
        const reuniaoService = new ReuniaoService(this.reuniao,usuarioService,salaPresencialService);

        
    }

} 