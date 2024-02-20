import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmail } from '../domain/use-cases/email/send-email';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import fs from 'fs';


const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const emailService = new EmailService();


export class Server {

  public static start() {

    console.log( 'Server started...' );
  
    const html = fs.readFileSync('src/presentation/email/templates/invitacionGamer/invitacion.html', 'utf-8');

    //jorge.69022752@gmail.com
    //lopezmar612@gmail.com

    new SendEmail(
      emailService,
    ).execute({
      to: 'lopezmar612@gmail.com',
      subject: 'Invitación',
      htmlBody: html,
    });

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
    //   }
    // );


  }


}


