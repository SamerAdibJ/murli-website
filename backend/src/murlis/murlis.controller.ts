import { Controller, Get } from '@nestjs/common';
import { MurlisService } from './murlis.service';

@Controller('murli')
export class MurlisController {
  constructor(private readonly murlisService: MurlisService) {}

  @Get('today')
  async getTodayMurli() {
    return await this.murlisService.getTodayMurli();
  }
}
