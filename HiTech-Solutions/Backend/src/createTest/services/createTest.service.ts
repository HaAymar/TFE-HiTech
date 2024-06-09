import { Repository } from 'typeorm';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { CreationTest } from '../../typeorm/entities/CreationTest';
import { Student } from '../../typeorm/entities/Student';
import { Teacher } from '../../typeorm/entities/Teacher';
import { Test } from '../../typeorm/entities/Test';
import { CreateCreationTestDto } from '../dtos/createTest.dto';

@Injectable()
export class CreationTestService {
  constructor(
    @InjectRepository(CreationTest)
    private creationTestRepository: Repository<CreationTest>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findAll(id_teacher: number): Promise<CreationTest[]> {
    return this.creationTestRepository.find({
      where: { teacher: { id: id_teacher } },
      relations: ['course', 'teacher'],
    });
  }

  async create(dto: CreateCreationTestDto): Promise<CreationTest> {
    const { id_course, id_teacher, ...restData } = dto;

    let course, teacher;

    try {
      course = await this.courseRepository.findOne({
        where: { id: id_course },
      });

      teacher = await this.teacherRepository.findOne({
        where: { user: { id: id_teacher } },
        relations: ['user'],
      });

      if (!course || !teacher) {
        throw new NotFoundException('Course or Teacher not found');
      }
    } catch (error) {
      console.error('Error fetching course or teacher:', error);
      throw new InternalServerErrorException(
        'Failed to fetch course or teacher',
      );
    }

    try {
      const creationTest = this.creationTestRepository.create({
        ...restData,
        course,
        teacher,
      });

      const savedCreationTest =
        await this.creationTestRepository.save(creationTest);

      const rawQuery = `
          SELECT DISTINCT s.id AS id_student
          FROM Students s
          JOIN Students_Formation sf ON s.id = sf.id_student
          JOIN Formations f ON sf.id_formation = f.id
          JOIN Courses c ON f.id = c.id_formation
          WHERE c.id = ?;
        `;
      const studentIds = await this.studentRepository.query(rawQuery, [
        id_course,
      ]);
      console.log(studentIds);

      const tests = studentIds.map((studentId) => {
        return this.testRepository.create({
          teacher,
          student: { id: studentId.id_student },
          creationTest: savedCreationTest,
          score: 0,
          validation: 'No',
        });
      });

      await this.testRepository.save(tests);

      return savedCreationTest;
    } catch (error) {
      console.error('Error during test creation:', error);
      throw new InternalServerErrorException('Failed to create test');
    }
  }

  async update(
    id: number,
    updateData: Partial<CreationTest>,
  ): Promise<CreationTest> {
    const creationTest = await this.creationTestRepository.preload({
      id: id,
      ...updateData,
    });
    if (!creationTest) {
      throw new Error('CreationTest not found');
    }
    return this.creationTestRepository.save(creationTest);
  }

  async remove(id: number): Promise<void> {
    await this.testRepository.manager
      .transaction(async (transactionalEntityManager) => {
        const deleteResult = await transactionalEntityManager
          .createQueryBuilder()
          .delete()
          .from(Test)
          .where('id_creatTest = :id', { id })
          .execute();

        if (deleteResult.affected === 0) {
          throw new NotFoundException(
            `Test with id_creatTest ${id} not found.`,
          );
        }

        const creationDeleteResult = await transactionalEntityManager.delete(
          CreationTest,
          id,
        );
        if (creationDeleteResult.affected === 0) {
          throw new NotFoundException(`CreationTest with ID ${id} not found.`);
        }
      })
      .catch((error) => {
        console.error('Failed to delete entries:', error);
        throw new InternalServerErrorException(
          'Failed to delete entries due to an internal error.',
        );
      });
  }
}
