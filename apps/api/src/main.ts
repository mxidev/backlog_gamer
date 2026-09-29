import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { loadConfig } from './config';

config({ path: resolve(__dirname, '..', '.env') });

async function bootstrap() {
  const appConfig = loadConfig();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(appConfig.port);
}
bootstrap();
