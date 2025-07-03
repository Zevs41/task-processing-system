import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'core/prisma/prisma.service';
import { ReqCreateTaskDto } from 'apps/api/src/models/task/req-create-task.dto';
import { ResCreateTaskDto } from 'apps/api/src/models/task/res-create-task.dto';
import { ResTaskPaginationDto } from 'apps/api/src/models/task/res-task-pagination.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'core/config/config.interface';

@Injectable()
export class TaskRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async createOne(data: ReqCreateTaskDto): Promise<ResCreateTaskDto> {
    return this.prismaService.task.create({
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
  }

  async getOne(id: string): Promise<Task> {
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

  async imitatateTaskProceceed(taskId: string): Promise<void> {
    await this.prismaService.task.update({
      where: { id: taskId },
      data: { status: 'processing', startedAt: new Date() },
    });

    setTimeout(async () => {
      await this.prismaService.task.update({
        where: { id: taskId },
        data: { status: 'completed', completedAt: new Date() },
      });
    }, this.configService.getOrThrow('workerTimeout'));
  }
}
