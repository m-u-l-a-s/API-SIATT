import { Module } from "@nestjs/common";
import { SendEmailController } from "./send-email.controller";
import { SendEmailService } from "./send-email.service";

@Module({
    imports : [],
    controllers : [SendEmailController],
    providers : [SendEmailService],
    exports : []
})
export class SendEmailModule {}