import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Test } from '../../typeorm/entities/Test';
import { UpdateValidationDTO } from '../dtos/updateDTO';

export interface TestDTO {
  testId: number;
  testName: string;
  validation: 'Yes' | 'No';
  points?: number;
}

export interface CourseTestsDTO {
  courseName: string;
  tests: TestDTO[];
}

export interface StudentTestsDTO {
  studentName: string;
  studentSurname: string;
  courses: CourseTestsDTO[];
}

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}

  async getAllTests(): Promise<StudentTestsDTO[]> {
    const tests = await this.testRepository.find({
      relations: [
        'student',
        'student.user',
        'creationTest',
        'creationTest.course',
      ],
    });

    const studentMap: { [key: string]: StudentTestsDTO } = {};

    tests.forEach((test) => {
      const studentKey = `${test.student.user.name} ${test.student.user.surname}`;
      const courseKey = test.creationTest.course.name;

      if (!studentMap[studentKey]) {
        studentMap[studentKey] = {
          studentName: test.student.user.name,
          studentSurname: test.student.user.surname,
          courses: [],
        };
      }

      let course = studentMap[studentKey].courses.find(
        (c) => c.courseName === courseKey,
      );

      if (!course) {
        course = { courseName: courseKey, tests: [] };
        studentMap[studentKey].courses.push(course);
      }

      course.tests.push({
        testId: test.id,
        testName: test.creationTest.name,
        validation: test.validation,
        points: test.score,
      });
    });

    return Object.values(studentMap);
  }

  async updateValidation(
    testId: number,
    updateValidationDTO: UpdateValidationDTO,
  ): Promise<Test> {
    const test = await this.testRepository.findOne({ where: { id: testId } });

    if (!test) {
      throw new NotFoundException(`Test with ID ${testId} not found`);
    }

    test.validation = updateValidationDTO.validation;
    return this.testRepository.save(test);
  }
}
