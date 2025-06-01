import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoEntity } from 'src/reuniao/entities/reuniao.entity';
import { ReuniaoService } from 'src/reuniao/reuniao.service';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ZoomModule } from 'src/zoom/zoom.module';
import { ZoomService } from 'src/zoom/zoom.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, SalaPresencialEntity, ReuniaoEntity]), ZoomModule],
    providers: [SalaPresencialService, UsuarioService, ReuniaoService, ZoomService],
    exports: [TypeOrmModule]
})
export class MockDataBaseModule {}