import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormationsService } from '../formations/services/formations.service';
import { Course } from '../typeorm/entities/Courses';
import { Formation } from '../typeorm/entities/Formations';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Formation])],
  controllers: [CoursesController],
  providers: [CoursesService, FormationsService],
})
export class CoursesModule {}
