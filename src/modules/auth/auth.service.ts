import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';
import { SignUpInput } from './dto/sign-up.input';
import { SignUp } from './entities/signup.object';
import { SignInInput } from './dto/sign-in.input';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { AuthStrategies, Status } from '@common/types/User';
import { v4 } from 'uuid';
import dayjs from '@common/dayjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: SignUpInput): Promise<SignUp> {
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });
    if (existingUser) {
      return {
        success: false,
        message: `Please try another email.`,
      };
    }

    // init user
    const date = dayjs().add(1, 'day');
    const emailVerificationToken = `${date.unix()}-${v4()}`;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      authStrategy: AuthStrategies.LOCAL,
      status: Status.PENDING,
      timezone: data.timezone,
      emailVerificationToken,
      emailVerificationTokenExpirationDate: date.toDate(),
    });

    try {
      await this.em.flush();
      await this.em.refresh(user);
      return {
        success: true,
        message: `User with email <${user.email}> has been created. Please check your email to verify your account.`,
        user: wrap(user).toObject(),
      };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: `Something went wrong. Please try again.`,
      };
    }
  }

  async signIn(data: SignInInput) {
    switch (data.authStrategy) {
      case 'local':
        return this.localSignIn(data.email, data.password);
      case 'google':
        return this.googleSignIn(data.authCode);
    }
    throw new BadRequestException('Invalid auth strategy');
  }

  async localSignIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    // enable this if you want to verify email
    // if (!user.isEmailVerified) {
    //   throw new UnauthorizedException('Your email address is not verified.');
    // }
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { key: user.key };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }

  // TODO: Implement google sign in
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleSignIn(_authCode: string) {
    return {};
  }
}
