import { Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

const getConfig = ({
  host,
  dbName,
  password,
  user,
  port,
}: Options): Options => ({
  dbName,
  host,
  password,
  user,
  port,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  forceUtcTimezone: true,
  allowGlobalContext: true,
  driver: PostgreSqlDriver,
  migrations: {
    tableName: '_migrations',
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
    emit: 'ts',
  },
  seeder: {
    path: path.join(__dirname, './seeders'),
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
  },
  debug: process.env.DEBUG === 'true' || process.env.DEBUG?.includes('db'),
  extensions: [Migrator, SeedManager],
});

const config = (configService: ConfigService) => {
  return getConfig({
    host: configService.get('DB_HOST'),
    dbName: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    user: configService.get('DB_USERNAME'),
    port: configService.get('DB_PORT'),
  });
};

export const postgresConfig = config;

export default () => {
  return getConfig({
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    port: +process.env.DB_PORT,
  });
};
