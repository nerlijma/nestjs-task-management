import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroClientController } from './micro-client.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://kkozlfvb:mxRasnW9d_VgNpXp0Inrm81ahxNNHtEb@woodpecker.rmq.cloudamqp.com/kkozlfvb'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [MicroClientController]
})
export class MicroClientModule { }
