import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBlessingDto {
  @ApiPropertyOptional({ description: 'Blessing content (Arabic)' })
  contentAr?: string;

  @ApiPropertyOptional({ description: 'Blessing content (English)' })
  contentEn?: string;

  @ApiPropertyOptional()
  theme?: string | null;

  @ApiPropertyOptional({ default: false })
  published?: boolean;
}
