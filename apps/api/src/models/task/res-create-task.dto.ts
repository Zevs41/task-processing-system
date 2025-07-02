import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ETaskPriority, ETaskStatus } from '@prisma/client';

export class ResCreateTaskDto {
  @ApiProperty({
    description: 'Название задачи',
  })
  @IsUUID()
  id: string;

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

  @ApiProperty({
    description: 'Статус',
    enum: Object.values(ETaskStatus),
  })
  @IsDefined()
  @IsEnum(ETaskStatus)
  status: ETaskStatus;

  @ApiProperty({
    description: 'Дата создания',
  })
  @IsDefined()
  @IsDateString()
  createdAt: Date;
}
