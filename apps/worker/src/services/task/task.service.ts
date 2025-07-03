import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'core/domains/task/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async imitateTaskProceceed(taskId: string) {
    return this.taskRepository.imitatateTaskProceceed(taskId);
  }
}
