import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Controller('client')
@UseGuards(AuthGuard('jwt'))
export class ClientController {
    constructor(private clientService: ClientService) { }

    findAll(): Client[] {
        return this.clientService.findAll();
    }

    async tiraException(tipo: string): Promise<string> {
        if (tipo === 'un_error') {
            throw new NotFoundException();
        } else {
            return Promise.resolve("FINALIZADO");
        }
    }
}
