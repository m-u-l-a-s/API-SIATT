import {
    Injectable,
    NotAcceptableException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validarUsuario(login: string, senha: string): Promise<any> {
        const user = this.usuarioService.findOneByEmail(login)
        if (!user) {
            throw new UnauthorizedException("Email ou senha inválidos!")
        }
        if ((await user).compararSenha(senha)) {
            return await this.gerarToken(await user)
        }
    }

    async gerarToken(payload: UsuarioEntity) {
        return {
            access_token: this.jwtService.sign(
                { email: payload.email },
                {
                    secret: process.env.JWT_TOKEN,
                    expiresIn: '30d'
                }
            )
        }
    }

}
