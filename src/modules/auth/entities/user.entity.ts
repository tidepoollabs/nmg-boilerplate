import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';
import {
  Entity,
  Property,
  PrimaryKey,
  Unique,
  Enum,
  OneToOne,
  Cascade,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { AuthStrategies, Status } from '@common/types/User';
import { UserProfile } from './user-profile.entity';
import { Project } from '@modules/project/entities/project.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Field(() => ID, { description: 'User unique identifier' })
  @Property({ nullable: false, type: 'uuid' })
  @Unique()
  key: string = v4();

  @Field({ description: 'User email' })
  @Property({ nullable: false })
  @Unique()
  email!: string;

  @Property({ nullable: true, hidden: true })
  @Exclude()
  password: string;

  @Enum({
    items: () => AuthStrategies,
    type: 'string',
  })
  authStrategy: AuthStrategies = AuthStrategies.LOCAL;

  @Enum({
    items: () => Status,
    type: 'string',
  })
  status: string = Status.PENDING;

  @Field({ description: 'User timezone' })
  @Property({ nullable: true })
  timezone?: string;

  @Field({ description: 'Whether if email is verified', defaultValue: false })
  @Property({ default: false })
  isEmailVerified: boolean;

  @Property({ nullable: true })
  emailVerificationToken: string;

  @Property({ nullable: true })
  emailVerificationTokenExpirationDate: Date;

  @Field(() => UserProfile, { description: 'Profile' })
  @OneToOne(() => UserProfile, (profile) => profile.user, {
    owner: true,
    orphanRemoval: true,
    cascade: [Cascade.REMOVE],
  })
  profile!: UserProfile;

  @Field({ description: 'Joined at', name: 'joinedAt' })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => Project, { description: 'Project', nullable: true })
  @OneToMany(() => Project, (project) => project.owner, {
    lazy: true,
    hidden: true,
  })
  projects = new Collection<Project>(this);
}
