import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MurlisService } from './murlis.service';
import { ok } from '../common/helpers/response';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
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
