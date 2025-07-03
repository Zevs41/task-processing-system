import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'core/config/config.interface';
import { WinstonModule } from 'nest-winston';
import { loggerOptions } from 'core/logger/winston.logger';
import { GlobalExceptionFilter } from 'core/exception/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      bufferLogs: true,
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672',
        ],
        queue: process.env.RABBITMQ_QUEUE_NAME || 'tasks',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  const appConfig: ConfigService<IConfig> = app.get(ConfigService);

  const env = appConfig.getOrThrow<string>('nodeEnv');

  app.useLogger(WinstonModule.createLogger(loggerOptions(env)));

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen();
}
bootstrap();
