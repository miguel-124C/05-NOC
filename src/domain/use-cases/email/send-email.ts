import { EmailService, SendMailOptions } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: ( options: SendMailOptions ) => Promise<boolean>;
}


export class SendEmail implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
    ){}

    async execute( options: SendMailOptions ): Promise<boolean>{
        const { to, subject, htmlBody } = options;

        try{
            const sent = await this.emailService.sendEmail({ to, subject, htmlBody });

            if (!sent) throw new Error('Email log not sent');

            return true;
        }catch(error){

            return false;
        }

    };

}