import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LocalStrategy } from './local.auth';

@Module({
  imports : [TypeOrmModule.forFeature([UsuarioEntity]), PassportModule, JwtModule],
  providers: [AuthService, UsuarioService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
