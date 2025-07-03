import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from '../config/config.interface';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { RabbitService } from './rabbit.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'RabbitMQ',
        useFactory: async (configService: ConfigService<IConfig>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow('rabbitmqUrl') as RmqUrl],
            queue: configService.getOrThrow('rabbitmqQueueName'),
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
