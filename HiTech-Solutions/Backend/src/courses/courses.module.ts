import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormationsService } from '../formations/services/formations.service';
import { Course } from '../typeorm/entities/Courses';
import { Formation } from '../typeorm/entities/Formations';
import { TeachersCourse } from '../typeorm/entities/TeachCourses';
import { Teacher } from '../typeorm/entities/Teacher';
import { User } from '../typeorm/entities/User';
import { UsersService } from '../users/services/users.service';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Formation,
      User,
      TeachersCourse,
      Teacher,
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, FormationsService, UsersService],
})
export class CoursesModule {}
