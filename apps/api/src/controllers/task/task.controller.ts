import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../middleware/guard/api-auth.guard';
import { TaskService } from '../../services/task/task.service';
import { ReqCreateTaskDto } from '../../models/task/req-create-task.dto';
import { ReqPaginationDto } from '../../models/pagination/req-pagination.dto';
import { ResCreateTaskDto } from '../../models/task/res-create-task.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Создать задачу',
  })
  @Post('')
  @ApiResponse({
    status: 201,
    description: 'Задача успешно создана',
    type: ResCreateTaskDto,
  })
  createOne(@Body() data: ReqCreateTaskDto): Promise<ResCreateTaskDto> {
    return this.taskService.createOne(data);
  }

  @ApiOperation({
    summary: 'Получение статуса задачи ',
  })
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.taskService.getOne(id);
  }

  @ApiOperation({
    summary: 'Получить задачу по id',
  })
  @Get('')
  getPage(@Query() paginationQuery: ReqPaginationDto) {
    return this.taskService.getPage(
      paginationQuery.page,
      paginationQuery.limit,
    );
  }
}
