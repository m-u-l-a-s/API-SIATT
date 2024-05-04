import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.controller';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(login : Login): Promise<any> {
    const user = await this.authService.validarUsuario(login.email, login.senha);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}