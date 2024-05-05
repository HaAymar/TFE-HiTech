import { Teacher } from 'src/typeorm/entities/Teacher';

// creation-test.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '../typeorm/entities/Courses';
import { CreationTest } from '../typeorm/entities/CreationTest';
import { CreationTestController } from './controllers/createTest.controller';
import { CreationTestService } from './services/createTest.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreationTest, Course, Teacher])],
  providers: [CreationTestService],
  controllers: [CreationTestController],
  exports: [CreationTestService],
})
export class CreationTestModule {}
