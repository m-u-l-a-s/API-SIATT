import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaPresencialEntity } from 'src/sala-presencial/entities/sala-presencial.entity';
import { SalaPresencialService } from 'src/sala-presencial/sala-presencial.service';
import { SalaVirtualEntity } from 'src/sala-virtual/entities/sala-virtual.entity';
import { SalaVirtualService } from 'src/sala-virtual/sala-virtual.service';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, SalaPresencialEntity, SalaVirtualEntity])],
    providers: [SalaPresencialService, UsuarioService, SalaVirtualService],
    exports: [TypeOrmModule]
})
export class MockDataBaseModule {}