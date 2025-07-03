import { Injectable } from '@nestjs/common';
import { ReqCreateTaskDto } from '../../models/task/req-create-task.dto';
import { ResTaskPaginationDto } from '../../models/task/res-task-pagination.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'core/config/config.interface';
import { ResCreateTaskDto } from '../../models/task/res-create-task.dto';
import { RabbitService } from '../../../../../core/rabbit/rabbit.service';
import { TaskRepository } from 'core/domains/task/task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly rabbitService: RabbitService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async createOne(data: ReqCreateTaskDto): Promise<ResCreateTaskDto> {
    const task = await this.taskRepository.createOne(data);

    await this.rabbitService.sendMessage(
      this.configService.getOrThrow('rabbitmqQueueName'),
      task.id,
    );

    return task;
  }

  async getOne(id: string) {
    return this.taskRepository.getOne(id);
  }

  async getPage(page: number, limit: number): Promise<ResTaskPaginationDto> {
    return this.taskRepository.getPage(page, limit);
  }
}
