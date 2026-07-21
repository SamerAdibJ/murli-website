import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ??
        'murli-website-jwt-secret-key-change-in-production',
    });
  }

  async validate(payload: { sub: string; role: string }) {
    const user = await this.usersService.findById(payload.sub);

    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    return { id: user.id, role: user.role, email: user.email };
  }
}
