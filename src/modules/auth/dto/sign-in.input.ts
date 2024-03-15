import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, ValidateIf } from 'class-validator';
import { registerEnumType } from '@nestjs/graphql';
import { AuthStrategies } from '@common/types/User';

registerEnumType(AuthStrategies, {
  name: 'AuthStrategies',
  description: 'Auth strategies',
});

@InputType()
export class SignInInput {
  @Field(() => AuthStrategies, {
    description: 'Auth strategy',
    defaultValue: AuthStrategies.LOCAL,
  })
  @IsNotEmpty()
  @IsString()
  authStrategy: AuthStrategies;

  @Field({ description: 'Email' })
  @ValidateIf((o) => o.authStrategy === AuthStrategies.LOCAL)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ description: 'User Password' })
  @ValidateIf((o) => o.authStrategy === AuthStrategies.LOCAL)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field({
    description: 'Google auth code',
    defaultValue: null,
    nullable: true,
  })
  @ValidateIf((o) => o.authStrategy === AuthStrategies.GOOGLE)
  @IsString()
  @IsNotEmpty()
  authCode: string;
}
