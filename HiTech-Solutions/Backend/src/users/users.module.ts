import { Student } from 'src/typeorm/entities/Student';
import { Teacher } from 'src/typeorm/entities/Teacher';
import { User } from 'src/typeorm/entities/User';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from '../typeorm/entities/Admin';
import { Course } from '../typeorm/entities/Courses';
import { Formation } from '../typeorm/entities/Formations';
import { Role } from '../typeorm/entities/Role';
import { StudentsFormation } from '../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../typeorm/entities/TeachCourses';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Teacher,
      Student,
      StudentsFormation,
      TeachersCourse,
      Admin,
      Formation,
      Course,
      Role,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
