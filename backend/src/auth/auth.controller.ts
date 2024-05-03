import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (
        private authService : AuthService
    ){}
    
    @Post('login')
    async login(@Body() body : Login) {
        try {
            return this.authService.validarUsuario(body)            
        } catch (error) {
            return error.message;
        }
    }
}
