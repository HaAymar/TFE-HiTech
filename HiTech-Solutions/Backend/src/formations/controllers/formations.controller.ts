import { diskStorage } from 'multer';
import { extname } from 'path';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createFormation(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFormationDto: CreateFormationDto,
  ): Promise<any> {
    const photoPath = file ? `uploads/${file.filename}` : null;
    return this.formationService.createFormation(createFormationDto, photoPath);
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
