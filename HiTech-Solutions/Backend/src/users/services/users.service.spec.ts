import { EntityManager, Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../typeorm/entities/User';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: Partial<Repository<User>>;
  let mockEntityManager: Partial<EntityManager>;

  beforeEach(async () => {
    mockRepository = {
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ]),
      findOne: jest.fn().mockImplementation((options) => {
        const userId = options.where.id;
        if (userId === 1) {
          return Promise.resolve({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
          });
        }
        return Promise.resolve(undefined);
      }),
    };
    mockEntityManager = {
      query: jest
        .fn()
        .mockResolvedValue([
          { UserId: 1, Name: 'John Doe', RoleName: 'Admin' },
        ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getEntityManagerToken(),
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    expect(await service.findUsers()).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const userId = 1;
    expect(await service.findOneById(userId)).toEqual({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });
});
