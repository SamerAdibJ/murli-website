import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMurliDto {
  @ApiPropertyOptional({
    example: 'morning',
    description: 'Murli type: morning or avyakt',
  })
  type?: 'morning' | 'avyakt';

  @ApiPropertyOptional()
  titleEn?: string | null;

  @ApiPropertyOptional()
  titleAr?: string | null;

  @ApiPropertyOptional({ description: 'Essence (Arabic)' })
  essenceAr?: string | null;

  @ApiPropertyOptional({ description: 'Essence (English)' })
  essenceEn?: string | null;

  @ApiPropertyOptional({ description: 'Question (Arabic)' })
  questionAr?: string | null;

  @ApiPropertyOptional({ description: 'Question (English)' })
  questionEn?: string | null;

  @ApiPropertyOptional({ description: 'Answer (Arabic)' })
  answerAr?: string | null;

  @ApiPropertyOptional({ description: 'Answer (English)' })
  answerEn?: string | null;

  @ApiPropertyOptional({ description: 'Main content (Arabic)' })
  mainContentAr?: string | null;

  @ApiPropertyOptional({ description: 'Main content (English)' })
  mainContentEn?: string | null;

  @ApiPropertyOptional({ description: 'Essence for dharna (Arabic)' })
  essenceForDharnaAr?: string | null;

  @ApiPropertyOptional({ description: 'Essence for dharna (English)' })
  essenceForDharnaEn?: string | null;

  @ApiPropertyOptional({ description: 'Blessing (Arabic)' })
  blessingAr?: string | null;

  @ApiPropertyOptional({ description: 'Blessing (English)' })
  blessingEn?: string | null;

  @ApiPropertyOptional({ description: 'Slogan (Arabic)' })
  sloganAr?: string | null;

  @ApiPropertyOptional({ description: 'Slogan (English)' })
  sloganEn?: string | null;

  @ApiPropertyOptional({ description: 'Avyakt signal (Arabic)' })
  avyaktSignalAr?: string | null;

  @ApiPropertyOptional({ description: 'Avyakt signal (English)' })
  avyaktSignalEn?: string | null;

  @ApiPropertyOptional()
  songTitle?: string | null;

  @ApiPropertyOptional()
  songUrl?: string | null;

  @ApiPropertyOptional({ default: false })
  published?: boolean;

  @ApiPropertyOptional()
  date?: string;
}
