import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { TaskModule } from 'apps/api/src/services/task/task.module';
import { PrismaModule } from 'apps/api/src/libs/prisma/prisma.module';
import { RabbitModule } from 'apps/api/src/libs/rabbit/rabbit.module';
import { ConfigModule } from '@nestjs/config';
import { Config } from 'apps/api/src/libs/config/config';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    RabbitModule,
    ConfigModule.forRoot({
      load: [Config],
      isGlobal: true,
    }),
  ],
  controllers: [WorkerController],
})
export class WorkerModule {}
