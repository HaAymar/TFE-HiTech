import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '../typeorm/entities/Courses';
import { CreationTest } from '../typeorm/entities/CreationTest';
import { Student } from '../typeorm/entities/Student';
import { Teacher } from '../typeorm/entities/Teacher';
import { Test } from '../typeorm/entities/Test';
import { CreationTestController } from './controllers/createTest.controller';
import { CreationTestService } from './services/createTest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreationTest, Course, Teacher, Test, Student]),
  ],
  providers: [CreationTestService],
  controllers: [CreationTestController],
  exports: [CreationTestService],
})
export class CreationTestModule {}
