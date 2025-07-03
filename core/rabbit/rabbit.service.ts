import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitService implements OnModuleInit {
  private readonly logger = new Logger(RabbitService.name);

  constructor(@Inject('RabbitMQ') private client: ClientProxy) {}

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (err) {
      throw err;
    }
  }

  sendMessage(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
