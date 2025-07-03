export interface IConfig {
  port: number;
  nodeEnv: string;

  secretKey: string;

  rabbitmqUrl: string;
  rabbitmqQueueName: string;

  workerTimeout: number;
}
