import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test } from '../typeorm/entities/Test';
import { ValidationController } from './controllers/validationTest.controller';
import { ValidationService } from './services/validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [ValidationService],
  controllers: [ValidationController],
})
export class ValidationModule {}
