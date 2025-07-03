import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TaskService } from '../../services/task/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @EventPattern('tasks')
  getNotifications(@Payload() taskId: string) {
    return this.taskService.imitateTaskProceceed(taskId);
  }
}
