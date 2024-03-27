import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Course } from '../../typeorm/entities/Courses';
import { CoursesService } from '../services/courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('nameFormation/:name')
  async findByFormationName(@Param('name') name: string): Promise<Course[]> {
    return this.coursesService.findByFormationName(name);
  }

  @Get()
  findAll() {
    return this.coursesService.findCourses();
  }

  @Post(':formationId')
  async addCourseToFormation(
    @Param('formationId') formationId: number,
    @Body() courseData: Partial<Course>,
  ): Promise<Course> {
    return this.coursesService.addCourseToFormation(formationId, courseData);
  }
}
