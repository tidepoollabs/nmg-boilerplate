import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './configs/config.schema';
import { postgresConfig } from './database/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from '@modules/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: configValidationSchema,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        postgresConfig(configService),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') !== 'production';
        return {
          debug: isProd,
          playground: isProd,
          autoSchemaFile: true,
          ...(configService.get('CORS_ORIGIN')
            ? {
                cors: {
                  origin: configService.get('CORS_ORIGIN').split(','),
                  credentials: true,
                },
              }
            : {}),
        };
      },
    }),
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
