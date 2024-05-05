import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { CreationTest } from '../../typeorm/entities/CreationTest';
import { Teacher } from '../../typeorm/entities/Teacher';
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
  ) {}

  async findAll(): Promise<CreationTest[]> {
    return this.creationTestRepository.find({
      relations: ['course', 'teacher'],
    });
  }

  async findOne(id: number): Promise<CreationTest> {
    return this.creationTestRepository.findOne({
      where: { id: id },
      relations: ['course', 'teacher'],
    });
  }

  async create(dto: CreateCreationTestDto): Promise<CreationTest> {
    const { id_course, id_teacher, ...restData } = dto;

    const course = await this.courseRepository.findOne({
      where: { id: id_course },
    });
    const teacher = await this.teacherRepository.findOne({
      where: { id: id_teacher },
    });

    if (!course || !teacher) {
      throw new NotFoundException('Course or Teacher not found');
    }

    const creationTest = this.creationTestRepository.create({
      ...restData,
      course,
      teacher,
    });

    return this.creationTestRepository.save(creationTest);
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
    await this.creationTestRepository.delete(id);
  }
}
