import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({ example: 'user-123' })
  userId!: string;

  @ApiProperty({ example: 1 })
  murliId!: number;
}
