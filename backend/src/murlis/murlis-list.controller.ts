import { Controller, Get, Query } from '@nestjs/common';
import { MurlisService } from './murlis.service';
import { ok } from '../common/helpers/response';

@Controller('murlis')
export class MurlisListController {
  constructor(private readonly murlisService: MurlisService) {}

  @Get()
  async listMurlis(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const p = page ? Number.parseInt(page, 10) : 1;
    const l = limit ? Number.parseInt(limit, 10) : 20;
    return ok(
      await this.murlisService.listMurlis(p, l, from, to),
      'Murlis fetched successfully',
    );
  }
}
