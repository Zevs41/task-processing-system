import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class ResPaginationExtraDto {
  @ApiProperty({
    example: 1,
  })
  @Min(1)
  page!: number;

  @ApiProperty({
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    example: 100,
  })
  total!: number;
}
