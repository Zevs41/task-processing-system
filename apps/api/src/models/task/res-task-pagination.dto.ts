import { Task } from '@prisma/client';
import { ResPaginationExtraDto } from '../pagination/res-pagination-extra.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResTaskPaginationDto extends ResPaginationExtraDto {
  @ApiProperty()
  tasks: Task[];
}
