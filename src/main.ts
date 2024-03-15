import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors();
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    const port = configService.get('PORT') || 3000;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
    logger.log(`Application Environment  "${configService.get('NODE_ENV')}"`);
  } catch (error) {
    logger.error(`Failed to start application`, error);
  }
}
bootstrap();
