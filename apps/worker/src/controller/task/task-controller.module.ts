import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskModule } from '../../services/task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [TaskController],
})
export class TaskControllerModule {}
