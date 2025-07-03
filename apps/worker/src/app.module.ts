import { Module } from '@nestjs/common';
import { CommonModule } from 'core/common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'core/logger/logging.interceptor';
import { ControllersModule } from './controller/controller.module';

@Module({
  imports: [CommonModule, ControllersModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
