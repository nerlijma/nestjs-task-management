import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { use } from 'passport';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(30000);
}
bootstrap();
