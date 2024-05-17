// import { join } from 'path';

// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthController } from './auth/auth.controller';
// import { AuthModule } from './auth/auth.module';
// import { CoursesModule } from './courses/courses.module';
// import { CreationTestModule } from './createTest/createTest.module';
// import { FormationsModule } from './formations/formations.module';
// import { Admin } from './typeorm/entities/Admin';
// import { Course } from './typeorm/entities/Courses';
// import { CreationTest } from './typeorm/entities/CreationTest';
// import { Formation } from './typeorm/entities/Formations';
// import { Role } from './typeorm/entities/Role';
// import { Student } from './typeorm/entities/Student';
// import { StudentsFormation } from './typeorm/entities/StudentFormation';
// import { TeachersCourse } from './typeorm/entities/TeachCourses';
// import { Teacher } from './typeorm/entities/Teacher';
// import { Test } from './typeorm/entities/Test';
// import { User } from './typeorm/entities/User';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRootAsync({
//       // imports: [ConfigModule],
//       // inject: [ConfigService],
//       // useFactory: (config: ConfigService) => ({
//       type: 'mysql',
//       host: 'hitech-server.mysql.database.azure.com',
//       port: 3306,
//       username: 'usoqlsrufi',
//       password: 'Hitechsolutions2',
//       database: 'hitech-database',
//       entities: [
//         User,
//         Role,
//         Admin,
//         Test,
//         StudentsFormation,
//         Teacher,
//         Student,
//         CreationTest,
//         TeachersCourse,
//         Formation,
//         Course,
//       ],
//       synchronize: false, // Est ce true
//     }),
//     // }),
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'public'),
//       serveRoot: '/uploads',
//     }),
//     UsersModule,
//     FormationsModule,
//     CoursesModule,
//     AuthModule,
//     CreationTestModule,
//   ],
//   controllers: [AppController, AuthController],
//   providers: [AppService],
// })
// export class AppModule {}
import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

// JWT_SECRET=000000000HiTech
// SECRET=HiTech-Solutions
// DB_TYPE=mysql
// DB_HOST=hitech-server.mysql.database.azure.com
// DB_PORT=3306
// DB_USERNAME=usoqlsrufi
// DB_PASSWORD=Hitechsolutions2
// SITE_URL=https://hitech-solutions.be
// DB_NAME=hitech-database

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
      synchronize: false, // Remember: setting this to true in production can lead to data loss!
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
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
// type: 'mysql',
// host: 'hitech-server.mysql.database.azure.com',
// port: 3306,
// username: 'usoqlsrufi',
// password: 'Hitechsolutions2',
// database: 'hitech-database',
