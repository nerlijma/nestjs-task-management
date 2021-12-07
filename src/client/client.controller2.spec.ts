import { CanActivate, NotFoundException } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let clientController: ClientController;
  let clientService: ClientService;
  let clientRepository: ClientRepository;

  beforeEach(async () => {
    clientRepository = new ClientRepository();
    clientService = new ClientService(clientRepository);
    clientController = new ClientController(clientService);
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

});
