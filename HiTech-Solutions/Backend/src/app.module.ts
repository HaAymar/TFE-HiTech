import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormationsModule } from './Formations/formations.module';
import { Course } from './typeorm/entities/Courses';
import { CreationTest } from './typeorm/entities/CreationTest';
import { Role } from './typeorm/entities/Role';
import { Section } from './typeorm/entities/Section';
import { Service } from './typeorm/entities/Services';
import { TeachersCourse } from './typeorm/entities/TeachCourses';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'testuser123',
      database: 'nestjssql',
      entities: [
        User,
        Role,
        CreationTest,
        TeachersCourse,
        Service,
        Section,
        Course,
      ],
      synchronize: true,
    }),
    UsersModule,
    FormationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
