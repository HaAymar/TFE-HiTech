import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateFormationDto } from '../dtos/createFormation';
import { DeleteFormationDto } from '../dtos/deleteFormation';
import { UpdateFormationDto } from '../dtos/updateFormation';
import { FormationsService } from '../services/formations.service';

@Controller('formations')
export class FormationsController {
  constructor(private formationService: FormationsService) {}
  @Get()
  findAll() {
    return this.formationService.findFormations();
  }

  @Post()
  async createFormation(@Body() createFormationDto: CreateFormationDto) {
    // console.log(createFormationDto);
    return this.formationService.createFormation(createFormationDto);
  }

  @Delete(':id')
  async deleteFormationById(
    @Param('id', ParseIntPipe) formationId: DeleteFormationDto,
  ) {
    await this.formationService.deleteFormation(formationId);
    console.log('La formation ', formationId, 'a été supprimé !');
  }

  @Put(':id')
  async updateFormationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateFormationDto,
  ) {
    await this.formationService.updateFormation(id, updateUserDto);
  }
}
