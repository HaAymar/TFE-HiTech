import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';

import { Admin } from '../../typeorm/entities/Admin';
import { Course } from '../../typeorm/entities/Courses';
import { Formation } from '../../typeorm/entities/Formations';
import { Role } from '../../typeorm/entities/Role';
import { Student } from '../../typeorm/entities/Student';
import { StudentsFormation } from '../../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../../typeorm/entities/TeachCourses';
import { Teacher } from '../../typeorm/entities/Teacher';
import { User } from '../../typeorm/entities/User';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockCourseRepository, mockRoleRepository, mockUserRepository;
  let mockTeacherRepository, mockStudentRepository, mockAdminRepository;
  let mockFormationRepository,
    mockTeachersCourseRepository,
    mockStudentsFormationRepository;
  let mockEntityManager;

  beforeEach(async () => {
    mockCourseRepository = jest.fn(() => ({
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ]),
      findOne: jest.fn().mockImplementation((options) => {
        if (options.where.id === 1) {
          return Promise.resolve({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
          });
        }
        return Promise.resolve(undefined);
      }),
      findOneOrFail: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      manager: {
        transaction: jest.fn().mockImplementation((operation) =>
          operation({
            findOne: jest.fn().mockResolvedValue(null),
            remove: jest.fn(),
          }),
        ),
      },
    }));
    mockRoleRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockUserRepository = jest.fn(() => ({
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ]),
      findOne: jest.fn().mockImplementation((options) => {
        if (options.where.id === 1) {
          return Promise.resolve({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
          });
        }
        return Promise.resolve(undefined);
      }),
      findOneOrFail: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
    }));
    mockTeacherRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockStudentRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockAdminRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockFormationRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockTeachersCourseRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockStudentsFormationRepository = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
    }));
    mockEntityManager = {
      query: jest.fn(),
    };
    mockUserRepository.manager = {
      transaction: jest.fn().mockImplementation((operation) =>
        operation({
          findOne: jest.fn().mockResolvedValue(null), // Mock supplémentaire si nécessaire
          remove: jest.fn(), // Exemple, adaptez selon l'utilisation
        }),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepository(),
        },
        { provide: getRepositoryToken(Role), useValue: mockRoleRepository() },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockTeacherRepository(),
        },
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository(),
        },
        { provide: getRepositoryToken(Admin), useValue: mockAdminRepository() },
        {
          provide: getRepositoryToken(Formation),
          useValue: mockFormationRepository(),
        },
        {
          provide: getRepositoryToken(TeachersCourse),
          useValue: mockTeachersCourseRepository(),
        },
        {
          provide: getRepositoryToken(StudentsFormation),
          useValue: mockStudentsFormationRepository(),
        },
        { provide: getEntityManagerToken(), useValue: mockEntityManager },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when deleting non-existent user', async () => {
    mockUserRepository().manager = {
      transaction: jest
        .fn()
        .mockImplementation((operation) => operation(mockEntityManager)),
    };
    mockEntityManager.findOne = jest.fn().mockResolvedValue(null);
    await expect(service.deleteUser(99)).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when deleting non-existent user', async () => {
    mockUserRepository.manager.transaction = jest
      .fn()
      .mockImplementation(() => {
        throw new NotFoundException();
      });
    await expect(service.deleteUser(99)).rejects.toThrow(NotFoundException);
  });
});
