import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientRepository)
        private clientRepository: ClientRepository) { }

    findAll(): Client[] {
        return this.clientRepository.findAll();
    }
}
