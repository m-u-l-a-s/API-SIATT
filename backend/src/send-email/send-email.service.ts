import { HttpCode, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { IBodyEmail } from "./IBodyEMail";


@Injectable()
export class SendEmailService {
    constructor(private readonly mailerService: MailerService) { }

    async send(body: IBodyEmail) {
        let link = ""
        let sala = ""

        if (body.link) {
            link = `<p> <b>Link da reunião: </b> ${body.link}</p>`
        }

        if (body.sala) {
            sala = `<p> <b>Sala: </b> ${body.sala}</p>`
        } 

        const html = `<h1>${body.titulo}</h1>
                            <h2>${body.pauta}</h2>
                            <p> <b>Data: </b> ${body.data}</p>
                            <p> <b>Hora: </b> ${body.hora}</p>
                            <p> <b>Duração: </b> ${body.duracao}</p>
                            <p> <b>Tipo: </b> ${body.categoria}</p>
                            ${sala}
                            ${link}
                        `
        return await this.mailerService.sendMail(
            {
                to: body.emails,
                from: 'siatt.connect@gmail.com',
                subject: body.titulo,
                html: html
            })
    }
}