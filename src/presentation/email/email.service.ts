import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions {
    to: string | string[],
    subject: string;
    htmlBody: string;
    attachments?: Attachments[]
}

interface Attachments {
    fileName    : string;
    path        : string;
}

export class EmailService {

    private readonly originPath: string = 'email.service.ts';
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    async sendEmail( options: SendMailOptions ): Promise<boolean> {
        
        const { to, subject, htmlBody, attachments } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;
        } catch (error) {
            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string[] ): Promise<boolean>{
        const subject = '';
        const htmlBody = `
            <h3>Logs de Sistema</h3>
            <p>loremaklsdjflasdjfsaldfjasdfjalñsfd</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachments[] = [
            { fileName: 'logs-all.log', path: './logs/logs-all.log' },
            { fileName: 'logs-high.log', path: './logs/logs-high.log' },
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({to, subject, htmlBody, attachments});
    
    }

}