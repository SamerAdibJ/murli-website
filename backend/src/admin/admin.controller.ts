import {
  Controller,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ok } from '../common/helpers/response';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin/users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('pending')
  async listPending() {
    return ok(
      await this.adminService.listPendingUsers(),
      'Pending users fetched successfully',
    );
  }

  @Get()
  async list(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? Number.parseInt(page, 10) : 1;
    const l = limit ? Number.parseInt(limit, 10) : 20;

    return ok(
      await this.adminService.listUsers(p, l),
      'Users fetched successfully',
    );
  }

  @Patch(':id/approve')
  async approve(@Param('id', ParseUUIDPipe) id: string) {
    return ok(
      await this.adminService.approveUser(id),
      'User approved successfully',
    );
  }

  @Patch(':id/reject')
  async reject(@Param('id', ParseUUIDPipe) id: string) {
    return ok(
      await this.adminService.rejectUser(id),
      'User rejected successfully',
    );
  }

  @Patch(':id/promote')
  async promote(@Param('id', ParseUUIDPipe) id: string) {
    return ok(
      await this.adminService.promoteUser(id),
      'User promoted to admin successfully',
    );
  }
}
