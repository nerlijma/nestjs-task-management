import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('micro')
export class MicroController {

    @EventPattern('event_created')
    eventCreated(data: any): string {
        console.log(`message consumed from rabbit: ${JSON.stringify(data)}`);
        return "recibido!";
    }
}
