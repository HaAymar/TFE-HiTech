import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreationTest } from '../../typeorm/entities/CreationTest';
import { CreateCreationTestDto } from '../dtos/createTest.dto';
import { CreationTestService } from '../services/createTest.service';

@Controller('creationTest')
export class CreationTestController {
  constructor(private readonly creationTestService: CreationTestService) {}

  @Get(':id')
  findAll(@Param('id') id_teacher: number): Promise<CreationTest[]> {
    return this.creationTestService.findAll(id_teacher);
  }

  @Post()
  create(@Body() creationTest: CreateCreationTestDto) {
    return this.creationTestService.create(creationTest);
  }

  @Put('modify/:id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCreationTestDto>,
  ) {
    return this.creationTestService.update(+id, updateData);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.creationTestService.remove(id);
  }
}
