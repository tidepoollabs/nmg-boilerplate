import { Migration } from '@mikro-orm/migrations';

export class Migration20240315121502 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user_profile" ("id" serial primary key, "key" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    );
    this.addSql(
      'alter table "user_profile" add constraint "user_profile_key_unique" unique ("key");',
    );

    this.addSql(
      'create table "user" ("id" serial primary key, "key" uuid not null, "email" varchar(255) not null, "password" varchar(255) null, "auth_strategy" text check ("auth_strategy" in (\'local\', \'google\')) not null default \'local\', "status" text check ("status" in (\'active\', \'inactive\', \'pending\')) not null default \'pending\', "timezone" varchar(255) null, "is_email_verified" boolean not null default false, "email_verification_token" varchar(255) null, "email_verification_token_expiration_date" timestamptz null, "profile_id" int null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    );
    this.addSql(
      'alter table "user" add constraint "user_key_unique" unique ("key");',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "user" add constraint "user_profile_id_unique" unique ("profile_id");',
    );

    this.addSql(
      'create table "project" ("id" serial primary key, "key" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "website" varchar(255) null, "owner_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);',
    );
    this.addSql(
      'alter table "project" add constraint "project_key_unique" unique ("key");',
    );
    this.addSql(
      'alter table "project" add constraint "project_name_unique" unique ("name");',
    );

    this.addSql(
      'alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "user_profile" ("id") on delete cascade;',
    );

    this.addSql(
      'alter table "project" add constraint "project_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" drop constraint "user_profile_id_foreign";',
    );

    this.addSql(
      'alter table "project" drop constraint "project_owner_id_foreign";',
    );

    this.addSql('drop table if exists "user_profile" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "project" cascade;');
  }
}
