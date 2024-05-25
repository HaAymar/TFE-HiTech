import { Test, TestingModule } from '@nestjs/testing';

import { Course } from '../../typeorm/entities/Courses';
import { CoursesService } from '../services/courses.service';
import { CoursesController } from './courses.controller';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: {
            findByFormationName: jest.fn().mockResolvedValue([]),
            findCourses: jest.fn().mockResolvedValue([]),
            findTeacherCourses: jest.fn().mockResolvedValue([]),
            addCourseToFormation: jest.fn().mockResolvedValue({}),
            deleteFormationById: jest.fn().mockResolvedValue(undefined),
            deleteCoursesById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findByFormationName', () => {
    it('should return an array of courses', async () => {
      const name = 'Test Formation';
      const result = await controller.findByFormationName(name);
      expect(result).toEqual([]);
      expect(service.findByFormationName).toHaveBeenCalledWith(name);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findCourses).toHaveBeenCalled();
    });
  });

  describe('getTeacherCourses', () => {
    it('should return an array of courses for a teacher', async () => {
      const userId = 1;
      const result = await controller.getTeacherCourses(userId);
      expect(result).toEqual([]);
      expect(service.findTeacherCourses).toHaveBeenCalledWith(userId);
    });
  });

  describe('addCourseToFormation', () => {
    it('should add a course to a formation and return the course', async () => {
      const formationId = 1;
      const courseData: Partial<Course> = {
        name: 'New Course',
      };
      const result = await controller.addCourseToFormation(
        formationId,
        courseData,
      );
      expect(result).toEqual({});
      expect(service.addCourseToFormation).toHaveBeenCalledWith(
        formationId,
        courseData,
      );
    });
  });

  describe('deleteCoursesByFormationId', () => {
    it('should delete courses by formation id', async () => {
      const formationId = 1;
      await controller.deleteCoursesByFormationId(formationId);
      expect(service.deleteFormationById).toHaveBeenCalledWith(formationId);
    });
  });

  describe('deleteCoursesById', () => {
    it('should delete a course by id', async () => {
      const courseId = 1;
      await controller.deleteCoursesById(courseId);
      expect(service.deleteCoursesById).toHaveBeenCalledWith(courseId);
    });
  });
});
