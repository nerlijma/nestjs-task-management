import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { NotFoundException } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { getRepositoryToken } from '@nestjs/typeorm';



describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;
  let mockClientService = { findAll: () => [] };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService
      ]
    })
      .overrideProvider(ClientService).useValue(mockClientService)
      .compile();

    clientController = moduleRef.get(ClientController);
    clientService = moduleRef.get(ClientService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
  });

  it('findAll should call findAll() and return empty array', () => {
    const clientServiceSpy = jest.spyOn(clientService, 'findAll');
    const result = clientController.findAll();
    expect(result).toEqual([]);
    expect(clientServiceSpy).toBeCalledTimes(1);
  })

  it('tiraException with "un_error" should throw a NotFoundException exception', async () => {
    // rejects.toThrow solo funciona con Promise
    expect(clientController.tiraException("un_error")).rejects.toThrow(NotFoundException);
  });

  it('tiraException with "nico" should return "FINALIZADO"', async () => {
    const actual = await clientController.tiraException("nico");
    expect(actual).toEqual("FINALIZADO");
  });

})