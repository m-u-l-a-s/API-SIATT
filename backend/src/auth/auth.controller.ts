import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface Login {
    email: string
    senha: string
}

@Controller('auth')
export class AuthController {
    constructor (
        private authService : AuthService
    ){}
    
    @Post('login')
    async login(@Body() body : Login) {
        try {
            return this.authService.validarUsuario(body.email, body.senha)            
        } catch (error) {
            return error.message;
        }
    }
}
