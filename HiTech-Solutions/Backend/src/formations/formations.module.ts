import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Service } from '../typeorm/entities/Services';
import { FormationsController } from './controllers/formations.controller';
import { FormationsService } from './services/formations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [FormationsController],
  providers: [FormationsService],
})
export class FormationsModule {}
