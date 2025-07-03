import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDomainModule } from 'core/domains/task/task.module';

@Module({
  imports: [TaskDomainModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
