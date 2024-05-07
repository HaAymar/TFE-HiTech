import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateCreationTestDto } from '../dtos/createTest.dto';
import { CreationTestService } from '../services/createTest.service';

@Controller('creationTest')
export class CreationTestController {
  constructor(private readonly creationTestService: CreationTestService) {}

  @Get()
  findAll() {
    return this.creationTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creationTestService.findOne(+id);
  }

  @Post()
  create(@Body() creationTest: CreateCreationTestDto) {
    return this.creationTestService.create(creationTest);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCreationTestDto>,
  ) {
    return this.creationTestService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creationTestService.remove(+id);
  }
}
