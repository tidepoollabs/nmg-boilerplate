import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.entity';
import { EntityDTO } from '@mikro-orm/core';

@ObjectType()
export class SignUp {
  @Field(() => User, { description: 'User', nullable: true })
  user?: EntityDTO<User>;

  @Field({ description: 'Wether if user successfully registered' })
  success: boolean;

  @Field({ description: 'Message' })
  message: string;
}
