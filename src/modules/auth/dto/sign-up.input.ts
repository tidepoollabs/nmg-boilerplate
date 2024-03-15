import { InputType, Field } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { UserType } from '@common/types/User';

import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

registerEnumType(UserType, {
  name: 'UserType',
  description: 'User type',
});

@InputType()
export class SignUpInput {
  @Field({ description: 'Email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  email: string;

  @Field({ description: 'User Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @Field({ description: 'User timezone', nullable: true })
  @IsString()
  @IsOptional()
  timezone?: string;

  @Field({ description: 'User first name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field({ description: 'User last name' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
