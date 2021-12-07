import { Body, Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('micro-client')
export class MicroClientController {

    constructor(
        @Inject('MICRO_CLIENT') private client: ClientProxy,
    ) { }

    @Get()
    send(@Body() message: any) {
        console.log(message);
        console.log(`Sending message to microservice: ${message}`)
        this.client.emit<any>('event_created', { obj1: 1, obj2: 2, data: message }).subscribe(
            response => console.log('response', response));
    }

}
