import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmail } from '../domain/use-cases/email/send-email';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import fs from 'fs';


const fsRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoRepository = new LogRepositoryImpl(
  new MongoLogDatasource(),
);
const postgresRepository = new LogRepositoryImpl(
  new PostgresLogDatasource(),
);
const emailService = new EmailService();

export class Server {

  public static async start() {
    console.log( 'Server started...' );

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [fsRepository, mongoRepository, postgresRepository],
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
      }
    );
    
  }
  
}

// Ejemplo de uso
// const correo = 'mikicuellar20@gmail.com';
// const html = fs.readFileSync('src/presentation/email/templates/invitacionGamer/invitacion.html', 'utf-8');

//jorge.69022752@gmail.com
//lopezmar612@gmail.com

// new SendEmail(
//   emailService,
// ).execute({
//   to: 'lopezmar612@gmail.com',
//   subject: 'Invitación',
//   htmlBody: html,
// });