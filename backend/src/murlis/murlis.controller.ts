import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MurlisService } from './murlis.service';
import { CreateMurliDto } from './dto/create-murli.dto';
import { UpdateMurliDto } from './dto/update-murli.dto';
import { ok } from '../common/helpers/response';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('murli')
export class MurlisController {
  constructor(private readonly murlisService: MurlisService) {}

  @Get('today')
  async getTodayMurli(
    @GetUser() user: { role: string },
    @Query('date') date?: string,
  ) {
    const murli = await this.murlisService.getTodayMurli(
      user.role === 'admin',
      date,
    );
    return ok(murli, 'Today Murli fetched successfully');
  }

  @Get(':date')
  async getMurliByDate(
    @Param('date') date: string,
    @GetUser() user: { role: string },
  ) {
    const murli = await this.murlisService.getMurliByDate(
      date,
      user.role === 'admin',
    );
    return ok(murli, `Murli for ${date} fetched successfully`);
  }

  @Post()
  async createMurli(@Body() data: CreateMurliDto) {
    const murli = await this.murlisService.createMurli(data);
    return ok(murli, 'Murli created successfully');
  }

  @Patch(':id')
  async updateMurli(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMurliDto,
  ) {
    const murli = await this.murlisService.updateMurli(id, data);
    return ok(murli, 'Murli updated successfully');
  }

  @Delete(':id')
  async deleteMurli(@Param('id', ParseIntPipe) id: number) {
    await this.murlisService.deleteMurli(id);
    return ok(null, 'Murli deleted successfully');
  }
}
