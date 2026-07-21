import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ok } from '../common/helpers/response';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return ok(user, 'Registration successful. Awaiting admin approval.');
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return ok(result, 'Login successful');
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const result = await this.authService.refresh(refreshToken);
    return ok(result, 'Token refreshed successfully');
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    await this.authService.logout(refreshToken);
    return ok(null, 'Logged out successfully');
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('logout-all')
  async logoutAll(@GetUser() user: { id: string }) {
    await this.authService.logoutAll(user.id);
    return ok(null, 'Logged out from all devices successfully');
  }
}
