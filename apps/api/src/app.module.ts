import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from './libs/config/config';
import { ControllersModule } from './controllers/controllers.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './libs/logger/logging.interceptor';
import { RabbitModule } from './libs/rabbit/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
      isGlobal: true,
    }),

    ControllersModule,
    PrismaModule,
    RabbitModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
