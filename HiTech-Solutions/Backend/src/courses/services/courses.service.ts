import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { Formation } from '../../typeorm/entities/Formations';

// import { DeleteCourseDto } from '../dtos/deleteCourses';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  findCourses() {
    return this.courseRepository.find();
  }

  async findByFormationName(formationName: string): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('c')
      .innerJoin('c.formation', 'f')
      .where('f.name = :formationName', { formationName })
      .getMany();
  }

  async addCourseToFormation(
    formationId: number,
    courseData: Partial<Course>,
  ): Promise<Course> {
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new Error(`Formation with ID ${formationId} not found`);
    }

    const course = this.courseRepository.create(courseData);
    course.formation = formation;

    const savedCourse = await this.courseRepository.save(course);
    console.log('New course:', savedCourse);
    return savedCourse;
  }

  async deleteCoursesByFormationId(formationId: number): Promise<void> {
    await this.courseRepository
      .createQueryBuilder()
      .delete()
      .from(Course)
      .where('formationId = :formationId', { formationId })
      .execute();

    await this.formationRepository.delete(formationId);
  }
}
