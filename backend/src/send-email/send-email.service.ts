import { HttpCode, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { BodyEmail } from "./IBodyEMail";


@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) { }

    public send(body: BodyEmail): void {
        body.emails.forEach(email => {
            this.mailerService.sendMail(
                {
                    to: email,
                    from: 'siatt.connect@gmail.com',
                    subject: body.titulo,
                    text: body.mensagem,
                    html: `<h1>${body.titulo}</h1>
                            <p>${body.mensagem}</p>`
                })
                .then(() => {
                    return HttpCode(201)
                })
                .catch(() => {
                    throw new Error("Falha ao enviar email!")
                })
        })
    }
}