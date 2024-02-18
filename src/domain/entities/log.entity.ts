
export enum LogSeverityLevel {
  low    = 'low',
  medium = 'medium',
  high   = 'high',
}

export interface LogEntityOptions {
  level       : LogSeverityLevel;
  message     : string;
  createdAt?  : Date;
  origin      : string;
}

export class LogEntity {

  public level     : LogSeverityLevel; // Enum
  public message   : string;
  public createdAt : Date;
  public origin    : string;

  constructor( options: LogEntityOptions ) {
    const { level, message, createdAt = new Date(), origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
    this.origin = origin;
  }

  //"{ "level": "high", "message":"Hola Mundo", "createdAt":"128937TZ12378123" }"
  static fromJson = ( json: string ): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    
    const log = new LogEntity({
      message, level, createdAt, origin
    });
    
    return log;
  }

}
