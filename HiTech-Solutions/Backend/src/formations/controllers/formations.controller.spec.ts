import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateFormationDto } from '../dtos/createFormation';
import { UpdateFormationDto } from '../dtos/updateFormation';
import { FormationsService } from '../services/formations.service';
import { FormationsController } from './formations.controller';

describe('FormationsController', () => {
  let controller: FormationsController;
  let service: FormationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationsController],
      providers: [
        {
          provide: FormationsService,
          useValue: {
            findFormations: jest
              .fn()
              .mockResolvedValue(['formation1', 'formation2']),
            createFormation: jest.fn().mockResolvedValue('Formation created'),
            deleteFormation: jest.fn().mockResolvedValue('Formation deleted'),
            updateFormation: jest.fn().mockResolvedValue('Formation updated'),
          },
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
    }).compile();

    controller = module.get<FormationsController>(FormationsController);
    service = module.get<FormationsService>(FormationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of formations', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(['formation1', 'formation2']);
      expect(service.findFormations).toHaveBeenCalled();
    });
  });

  describe('createFormation', () => {
    it('should create a formation and return success message', async () => {
      const dto: CreateFormationDto = {
        name: 'New Formation',
        description: 'Description of the formation',
        photo: 'photo.jpg',
      };
      const file = {
        originalname: 'test.jpg',
        filename: 'test.jpg',
      } as Express.Multer.File;
      const result = await controller.createFormation(file, dto);
      expect(result).toEqual('Formation created');
      expect(service.createFormation).toHaveBeenCalledWith(
        dto,
        'uploads/test.jpg',
      );
    });

    it('should throw an error if name is not provided', async () => {
      const dto: CreateFormationDto = {
        name: '',
        description: 'Description of the formation',
        photo: 'photo.jpg',
      };
      const file = {
        originalname: 'test.jpg',
        filename: 'test.jpg',
      } as Express.Multer.File;

      try {
        await controller.createFormation(file, dto);
      } catch (error) {
        expect(error.response.message).toContain('name should not be empty');
      }
    });
  });

  describe('updateFormationById', () => {
    it('should update a formation and not return a value', async () => {
      const dto: UpdateFormationDto = {
        name: 'Updated Formation',
        description: 'Updated description',
        image: 'updated_image.jpg',
      };
      await controller.updateFormationById(1, dto);
      expect(service.updateFormation).toHaveBeenCalledWith(1, dto);
    });
  });
});
