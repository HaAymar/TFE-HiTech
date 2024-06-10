import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormationsService } from '../formations/services/formations.service';
import { Admin } from '../typeorm/entities/Admin';
import { Course } from '../typeorm/entities/Courses';
import { CreationTest } from '../typeorm/entities/CreationTest';
import { Formation } from '../typeorm/entities/Formations';
import { Role } from '../typeorm/entities/Role';
import { Student } from '../typeorm/entities/Student';
import { StudentsFormation } from '../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../typeorm/entities/TeachCourses';
import { Teacher } from '../typeorm/entities/Teacher';
import { Test } from '../typeorm/entities/Test';
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
      Student,
      Admin,
      StudentsFormation,
      Role,
      CreationTest,
      Test,
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, FormationsService, UsersService],
})
export class CoursesModule {}
