import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { CoursesModule } from './courses/courses.module';
import { FormationsModule } from './Formations/formations.module';
import { Admin } from './typeorm/entities/Admin';
import { Course } from './typeorm/entities/Courses';
import { CreationTest } from './typeorm/entities/CreationTest';
import { Formation } from './typeorm/entities/Formations';
import { Role } from './typeorm/entities/Role';
import { Student } from './typeorm/entities/Student';
import { StudentsFormation } from './typeorm/entities/StudentFormation';
import { TeachersCourse } from './typeorm/entities/TeachCourses';
import { Teacher } from './typeorm/entities/Teacher';
import { Test } from './typeorm/entities/Test';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'testuser',
        password: 'testuser123',
        database: 'nestjssql',
        entities: [
          User,
          Role,
          Admin,
          Test,
          StudentsFormation,
          Teacher,
          Student,
          CreationTest,
          TeachersCourse,
          Formation,
          Course,
        ],
        synchronize: false,
        // synchronize: true, // ! SET TO FALSE IN PRODUCTION
      }),
    }),
    UsersModule,
    FormationsModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
