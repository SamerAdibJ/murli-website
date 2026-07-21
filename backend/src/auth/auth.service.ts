import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { refreshTokens } from '../drizzle/schema';
import { eq, and, gt } from 'drizzle-orm';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      id: randomUUID(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findRawByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException(
        `Account is ${user.status}. Please contact an administrator.`,
      );
    }

    const payload = { sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 900,
    });

    const refreshToken = await this.createRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(refreshTokenStr: string) {
    const tokenHash = this.hashToken(refreshTokenStr);

    const stored = await this.db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          gt(refreshTokens.expiresAt, new Date()),
        ),
      )
      .limit(1);

    if (stored.length === 0) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Delete the used token (rotation)
    await this.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.id, stored[0].id));

    const user = await this.usersService.findById(stored[0].userId);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    const payload = { sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || 900,
    });

    const newRefreshToken = await this.createRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshTokenStr: string) {
    const tokenHash = this.hashToken(refreshTokenStr);

    await this.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.tokenHash, tokenHash));
  }

  async logoutAll(userId: string) {
    await this.db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const rawToken = randomBytes(48).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const days =
      this.configService.get<number>('JWT_REFRESH_EXPIRES_IN_DAYS') ?? 30;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    await this.db.insert(refreshTokens).values({
      id: randomUUID(),
      userId,
      tokenHash,
      expiresAt,
    });

    return rawToken;
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
