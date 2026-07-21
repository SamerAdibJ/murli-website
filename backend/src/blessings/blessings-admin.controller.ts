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
import { BlessingsService } from './blessings.service';
import { CreateBlessingDto } from './dto/create-blessing.dto';
import { UpdateBlessingDto } from './dto/update-blessing.dto';
import { ok } from '../common/helpers/response';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('blessings')
export class BlessingsAdminController {
  constructor(private readonly blessingsService: BlessingsService) {}

  @Post()
  async create(
    @GetUser() user: { id: string | null },
    @Body() data: CreateBlessingDto,
  ) {
    const card = await this.blessingsService.create({
      ...data,
      createdBy: user.id,
    });
    return ok(card, 'Blessing card created successfully');
  }

  @Get()
  async list(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? Number.parseInt(page, 10) : 1;
    const l = limit ? Number.parseInt(limit, 10) : 20;
    return ok(
      await this.blessingsService.list(p, l),
      'Blessing cards fetched successfully',
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBlessingDto,
  ) {
    const card = await this.blessingsService.update(id, data);
    return ok(card, 'Blessing card updated successfully');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.blessingsService.delete(id);
    return ok(null, 'Blessing card deleted successfully');
  }
}
