import { Controller, Get, Query } from '@nestjs/common';
import { BlessingsService } from './blessings.service';
import { ok } from '../common/helpers/response';

@Controller('blessing')
export class BlessingUserController {
  constructor(private readonly blessingsService: BlessingsService) {}

  @Get('today')
  async getTodayBlessing(@Query('userId') userId: string) {
    const card = await this.blessingsService.getTodayBlessing(userId);
    return ok(card, "Today's blessing fetched successfully");
  }

  @Get('history')
  async getHistory(@Query('userId') userId: string) {
    const cards = await this.blessingsService.getHistory(userId);
    return ok(cards, 'Blessing history fetched successfully');
  }
}
