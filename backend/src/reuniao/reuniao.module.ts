import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoEntity } from './entities/reuniao.entity';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReuniaoEntity, UsuarioEntity, SalaPresencialEntity])],
  controllers: [ReuniaoController],
  providers: [ReuniaoService, SalaPresencialService, UsuarioService],
  exports: [TypeOrmModule]
})
export class ReuniaoModule {}
