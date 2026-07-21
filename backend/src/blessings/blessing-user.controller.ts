import { Controller, Get, UseGuards } from '@nestjs/common';
import { BlessingsService } from './blessings.service';
import { ok } from '../common/helpers/response';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('blessing')
export class BlessingUserController {
  constructor(private readonly blessingsService: BlessingsService) {}

  @Get('today')
  async getTodayBlessing(@GetUser() user: { id: string }) {
    const card = await this.blessingsService.getTodayBlessing(user.id);
    return ok(card, "Today's blessing fetched successfully");
  }

  @Get('history')
  async getHistory(@GetUser() user: { id: string }) {
    const cards = await this.blessingsService.getHistory(user.id);
    return ok(cards, 'Blessing history fetched successfully');
  }
}
