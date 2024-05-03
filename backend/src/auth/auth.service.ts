import {
    Injectable,
    NotAcceptableException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

export interface Login {
    email : string
    senha : string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validarUsuario(login : Login): Promise<any> {
        const user = this.usuarioService.findOneByEmail(login.email)
        if (!user) {
            throw new UnauthorizedException("Email ou senha inválidos!")
        } 
        const senhaTrue = (await user).compararSenha(login.senha)
        // if (senhaTrue) {
        //     return await this.gerarToken(await user)
        // } else {
        //     throw new UnauthorizedException("Senha inválida!")
        // }
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
