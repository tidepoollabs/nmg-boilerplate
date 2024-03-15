import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@common/types/User';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoadStrategy, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromHeader('auth_token'),
    });
  }

  async validate(payload: JwtPayload) {
    const { key } = payload;
    const user = await this.userRepository.findOne(
      { key },
      {
        populate: ['profile'],
        strategy: LoadStrategy.JOINED,
      },
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return wrap(user).toJSON();
  }
}
