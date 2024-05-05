import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { CreationTestModule } from './createTest/createTest.module';
import { FormationsModule } from './formations/formations.module';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
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
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public/uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    FormationsModule,
    CoursesModule,
    AuthModule,
    CreationTestModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
