import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { SignUp } from './entities/signup.object';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { AccessToken } from './entities/accessToken.object';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@common/guards/auth.guard';
import { CurrentUser } from '@common/decorators/current-user';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUp, { name: 'signUp' })
  async signUp(@Args('data') signUpInput: SignUpInput) {
    console.log(signUpInput);
    return this.authService.create(signUpInput);
  }

  @Mutation(() => AccessToken, { name: 'signIn' })
  async signIn(@Args('data') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: User) {
    return user;
  }
}
