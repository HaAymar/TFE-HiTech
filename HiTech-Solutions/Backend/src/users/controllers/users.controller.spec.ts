import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAllUsersWithRoles: jest.fn(),
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(service, 'findAllUsersWithRoles').mockResolvedValue(result);
      expect(await controller.getUsers()).toEqual({
        data: result,
        message: 'Users retrieved successfully',
      });
    });

    it('should throw an exception when service throws an error', async () => {
      jest
        .spyOn(service, 'findAllUsersWithRoles')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.getUsers()).rejects.toThrow(HttpException);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      jest.spyOn(service, 'findAllUsersWithRoles').mockResolvedValue(result);
      expect(await controller.getUsers()).toEqual({
        data: result,
        message: 'Users retrieved successfully',
      });
    });

    it('should throw an exception when service throws an error', async () => {
      jest
        .spyOn(service, 'findAllUsersWithRoles')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.getUsers()).rejects.toThrow(HttpException);
    });
  });
});
