import { CanActivate, NotFoundException } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientController', () => {
  let controller: ClientController;

  // let mockAuthGuard: CanActivate = { canActivate: () => true };
  // let mockAuthGuard = { canActivate: jest.fn(() => true) };
  let mockClientService = { findAll: () => [] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService]
    })
      //.overrideGuard(AuthGuard).useValue(mockAuthGuard)
      .overrideProvider(ClientService).useValue(mockClientService)
      .compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should call findAll() and return empty array', () => {
    const clientServiceSpy = jest.spyOn(mockClientService, 'findAll');
    const result = controller.findAll();
    expect(result).toEqual([]);
    expect(clientServiceSpy).toBeCalledTimes(1);
  });

  it('tiraException with "un_error" should throw a NotFoundException exception', async () => {
    // rejects.toThrow solo funciona con Promise
    expect(controller.tiraException("un_error")).rejects.toThrow(NotFoundException);
  });

  it('tiraException with "nico" should return "FINALIZADO"', async () => {
    const actual = await controller.tiraException("nico");
    expect(actual).toBe("FINALIZADO");
  });



});
