import { Module } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { ReuniaoController } from './reuniao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReuniaoEntity } from './entities/reuniao.entity';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';
import { SalaVirtualService } from 'src/sala-virtual/sala-virtual.service';
import { SalaVirtualEntity } from 'src/sala-virtual/entities/sala-virtual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReuniaoEntity, UsuarioEntity, SalaPresencialEntity, SalaVirtualEntity])],
  controllers: [ReuniaoController],
  providers: [ReuniaoService, SalaPresencialService, SalaVirtualService, UsuarioService],
  exports: [TypeOrmModule]
})
export class ReuniaoModule {}
