import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerStartup } from './swagger-startup';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  SwaggerStartup(app);

  const port = 30000

  // app.setGlobalPrefix('api');

  await app.listen(30000);
  logger.log(`Application listening on port: ${port}`);
}

bootstrap();
