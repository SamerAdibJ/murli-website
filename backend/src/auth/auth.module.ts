import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from './guards/roles.guard';
import { DrizzleModule } from '../drizzle/drizzle.module';

const JWT_SECRET =
  process.env.JWT_SECRET ?? 'murli-website-jwt-secret-key-change-in-production';

const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 900;

@Module({
  imports: [
    UsersModule,
    DrizzleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
