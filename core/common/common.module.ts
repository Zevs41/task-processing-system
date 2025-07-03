import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from 'core/config/config';
import { PrismaModule } from 'core/prisma/prisma.module';
import { PrismaService } from 'core/prisma/prisma.service';
import { RabbitModule } from 'core/rabbit/rabbit.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    RabbitModule,
    ConfigModule.forRoot({
      load: [Config],
      isGlobal: true,
    }),
  ],
})
export class CommonModule {}
