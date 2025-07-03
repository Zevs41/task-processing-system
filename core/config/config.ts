import type { IConfig } from './config.interface';

export const Config = (): IConfig => {
  return {
    port: Number(process.env.PORT_CLIENT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    secretKey: process.env.SECRET_KEY || 'secret',
    rabbitmqQueueName:
      process.env.RABBITMQ_QUEUE_NAME || 'amqp://user:password@localhost:5672',
    rabbitmqUrl: process.env.RABBITMQ_URL || 'queue',
    workerTimeout: Number(process.env.WORKER_TIMEOUT) || 600 * 1000,
  };
};
