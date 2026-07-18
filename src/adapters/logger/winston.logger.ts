import { Injectable } from '@nestjs/common';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import { createLogger, transports } from 'winston';

@Injectable()
export class WinstonLogger {
  private readonly logger = createLogger({
    transports: [
      new transports.Console(),
      new OpenTelemetryTransportV3({
        level: 'info',
      }),
    ],
  });

  info(message: string, ...opt: any[]) {
    this.logger.info(message, ...opt);
  }

  log(message: string, ...opt: any[]) {
    this.logger.info(message, ...opt);
  }

  error(message: string, ...opt: any[]) {
    this.logger.error(message, ...opt);
  }

  debug(message: string, ...opt: any[]) {
    this.logger.debug(message, ...opt);
  }

  warn(message: string, ...opt: any[]) {
    this.logger.warn(message, ...opt);
  }

  fatal(message: string, ...opt: any[]) {
    this.logger.error(message, ...opt);
  }
}
