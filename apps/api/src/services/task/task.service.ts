import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';
import { ReqCreateTaskDto } from '../../models/task/req-create-task.dto';
import { ResTaskPaginationDto } from '../../models/task/res-task-pagination.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig } from '../../libs/config/config.interface';
import { ResCreateTaskDto } from '../../models/task/res-create-task.dto';
import { RabbitService } from '../../libs/rabbit/rabbit.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rabbitService: RabbitService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async createOne(data: ReqCreateTaskDto): Promise<ResCreateTaskDto> {
    const task = await this.prismaService.task.create({
      data: data,
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true,
        createdAt: true,
      },
    });

    await this.rabbitService.sendMessage(
      this.configService.getOrThrow('rabbitmqQueueName'),
      task.id,
    );

    return task;
  }

  async getOne(id: string) {
    return this.prismaService.task.findUniqueOrThrow({ where: { id: id } });
  }

  async getPage(page: number, limit: number): Promise<ResTaskPaginationDto> {
    const [count, tasks] = await this.prismaService.$transaction([
      this.prismaService.task.count(),
      this.prismaService.task.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      tasks,
      page,
      limit,
      total: count,
    };
  }

  async imitatateTaskProceceed(taskId: string) {
    await this.prismaService.task.update({
      where: { id: taskId },
      data: { status: 'processing' },
    });

    setTimeout(async () => {
      await this.prismaService.task.update({
        where: { id: taskId },
        data: { status: 'completed' },
      });
    }, 600 * 1000);
  }
}
