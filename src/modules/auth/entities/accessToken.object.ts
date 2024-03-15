import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field({ description: 'JWT access token' })
  accessToken: string;
}
