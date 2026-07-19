import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlessingDto {
  @ApiProperty({
    example: 'النص العربي للبركة...',
    description: 'Blessing content (Arabic)',
  })
  contentAr!: string;

  @ApiProperty({
    example: 'English blessing text...',
    description: 'Blessing content (English)',
  })
  contentEn!: string;

  @ApiPropertyOptional({ example: 'peace' })
  theme?: string | null;

  @ApiPropertyOptional({ default: false })
  published?: boolean;

  @ApiPropertyOptional()
  createdBy?: string | null;
}
