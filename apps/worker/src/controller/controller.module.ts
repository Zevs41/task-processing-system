import { Module } from '@nestjs/common';
import { TaskControllerModule } from './task/task-controller.module';

@Module({
  imports: [TaskControllerModule],
})
export class ControllersModule {}
