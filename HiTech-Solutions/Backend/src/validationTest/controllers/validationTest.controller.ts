import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { Test } from '../../typeorm/entities/Test';
import { UpdateValidationDTO } from '../dtos/updateDTO';
import { ValidationService } from '../services/validation.service';
import { StudentTestsDTO } from '../services/validation.service';

@Controller('tests')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get()
  async getAllTests(): Promise<StudentTestsDTO[]> {
    return this.validationService.getAllTests();
  }

  @Patch(':id')
  async updateValidation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateValidationDTO: UpdateValidationDTO,
  ): Promise<Test> {
    return this.validationService.updateValidation(id, updateValidationDTO);
  }
}
