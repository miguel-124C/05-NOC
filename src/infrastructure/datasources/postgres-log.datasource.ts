import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '../../generated/prisma';

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

  async saveLog( log: LogEntity ): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level],
      }
    });
  
    console.log('Prisma log created: ', newLog.id);
  }

  async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: { level: severityEnum[severityLevel] }
    });

    return logs.map( LogEntity.fromObject );
  }

}

