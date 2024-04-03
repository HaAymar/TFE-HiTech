import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { FormationsModule } from './Formations/formations.module';
import { Course } from './typeorm/entities/Courses';
import { CreationTest } from './typeorm/entities/CreationTest';
import { Formation } from './typeorm/entities/Formations';
import { Role } from './typeorm/entities/Role';
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
      entities: [User, Role, CreationTest, TeachersCourse, Formation, Course],
      synchronize: true,
    }),
    UsersModule,
    FormationsModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
