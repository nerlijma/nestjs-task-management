import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://kkozlfvb:mxRasnW9d_VgNpXp0Inrm81ahxNNHtEb@woodpecker.rmq.cloudamqp.com/kkozlfvb'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen().then(() =>
    console.log('Microservice listening')
  );
}

bootstrap();
