import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../../core/logger/logging.interceptor';
import { CommonModule } from 'core/common/common.module';

@Module({
  imports: [CommonModule, ControllersModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
