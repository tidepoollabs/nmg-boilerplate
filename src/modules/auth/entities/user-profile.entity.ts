import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';
import {
  Entity,
  Property,
  PrimaryKey,
  Unique,
  OneToOne,
} from '@mikro-orm/core';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class UserProfile {
  @PrimaryKey()
  id!: number;

  @Field(() => ID, { description: 'User profile unique identifier' })
  @Property({ nullable: false, type: 'uuid' })
  @Unique()
  key: string = v4();

  @Field({ description: 'User first name' })
  @Property()
  firstName: string;

  @Field({ description: 'User last name' })
  @Property()
  lastName: string;

  @OneToOne(() => User, (user) => user.profile, {
    nullable: false,
    lazy: true,
    hidden: true,
  })
  user!: User;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
