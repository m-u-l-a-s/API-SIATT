import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface formLogin {
    email : string
    senha : string
}

@Controller('auth')
export class AuthController {
    constructor (
        private authService : AuthService
    ){}

    @Post('login')
    async login(@Body() body : formLogin) {
        return this.authService.validarUsuario(body.email, body.senha)
    }
}
