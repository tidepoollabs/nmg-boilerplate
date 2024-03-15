import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';
import {
  Entity,
  Property,
  PrimaryKey,
  Unique,
  ManyToOne,
} from '@mikro-orm/core';
import { User } from '@modules/auth/entities/user.entity';

@ObjectType()
@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Field(() => ID, { description: 'Project unique identifier' })
  @Property({ nullable: false, type: 'uuid' })
  @Unique()
  key: string = v4();

  @Field({ description: 'Project name' })
  @Property()
  @Unique()
  name!: string;

  @Field({ description: 'Project Description' })
  @Property()
  description!: string;

  @Field({ description: 'Project website', nullable: true })
  @Property({ nullable: true })
  website?: string;

  @ManyToOne({ entity: () => User })
  owner!: User;

  @Field({ description: 'Created at' })
  @Property()
  createdAt: Date = new Date();

  @Field({ description: 'Updated at' })
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
