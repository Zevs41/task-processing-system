import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TaskService } from 'apps/api/src/services/task/task.service';

@Controller()
export class WorkerController {
  constructor(private readonly taskService: TaskService) {}

  @EventPattern('tasks')
  getNotifications(@Payload() taskId: string) {
    return this.taskService.imitatateTaskProceceed(taskId);
  }
}
