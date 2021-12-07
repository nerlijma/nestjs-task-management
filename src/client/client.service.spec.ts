import { Test, TestingModule } from '@nestjs/testing';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

describe('ClientService', () => {
  const clientArray: Client[] = [{ id: 'my-id', name: 'my-name' }];

  let service: ClientService;
  let repository: ClientRepository;
  let mockClientRepository = { findAll: () => clientArray };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService,
        { provide: ClientRepository, useValue: mockClientRepository }
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('findAll should return given respository response', () => {
    const clientRepository = jest.spyOn(mockClientRepository, 'findAll');
    const result = service.findAll();
    expect(result).toBe(clientArray);
    expect(clientRepository).toBeCalledTimes(1);
  });

});
