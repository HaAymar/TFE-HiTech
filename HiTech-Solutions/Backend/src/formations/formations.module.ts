import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from '../typeorm/entities/Courses';
import { Formation } from '../typeorm/entities/Formations';
import { FormationsController } from './controllers/formations.controller';
import { FormationsService } from './services/formations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Formation, Course])],
  controllers: [FormationsController],
  providers: [FormationsService],
})
export class FormationsModule {}
