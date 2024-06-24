import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoEntity } from './entities/reuniao.entity';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';
import { ReuniaoAnexo } from 'src/reuniao-anexos/entities/reuniao-anexo.entity';
import { ReuniaoAnexosService } from 'src/reuniao-anexos/reuniao-anexos.service';
import { ReuniaoAnexosModule } from 'src/reuniao-anexos/reuniao-anexos.module';
@Module({
  imports: [TypeOrmModule.forFeature([ReuniaoEntity, UsuarioEntity, SalaPresencialEntity, ReuniaoAnexo])],
  controllers: [ReuniaoController],
  providers: [ReuniaoService, SalaPresencialService, UsuarioService, ReuniaoAnexosService],
  exports: [TypeOrmModule]
})
export class ReuniaoModule {}
