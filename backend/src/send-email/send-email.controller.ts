import { Controller, Post, Body } from "@nestjs/common";
import { SendEmailService } from "./send-email.service";
import { BodyEmail } from "./IBodyEMail";

@Controller('sendEmail')
export class SendEmailController {
    constructor( private readonly sendEmailService : SendEmailService){}

    @Post()
    sendEmail(@Body() body : BodyEmail){
        return this.sendEmailService.send(body)
    }
}