import { IsDefined, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ETaskPriority } from '@prisma/client';

export class ReqCreateTaskDto {
  @ApiProperty({
    description: 'Название задачи',
  })
  @IsDefined()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Описание задачи',
  })
  @IsDefined()
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Приоритет',
    enum: Object.values(ETaskPriority),
  })
  @IsDefined()
  @IsEnum(ETaskPriority)
  priority: ETaskPriority;
}
