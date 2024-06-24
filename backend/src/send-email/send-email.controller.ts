import { Controller, Post, Body } from "@nestjs/common";
import { SendEmailService } from "./send-email.service";
import { IBodyEmail } from "./IBodyEMail";

@Controller('sendEmail')
export class SendEmailController {
    constructor( private readonly sendEmailService : SendEmailService){}

    @Post()
    async sendEmail(@Body() body : IBodyEmail){
        return await this.sendEmailService.send(body)
    }
}