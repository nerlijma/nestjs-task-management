import { EntityRepository, Repository } from "typeorm";
import { Client } from "./client.entity";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
    findAll(): Client[] {
        const clients: Client[] = [];
        return clients;
    }
}