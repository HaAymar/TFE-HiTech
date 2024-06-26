import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Formation } from '../../typeorm/entities/Formations';
import { CreateFormationDto } from '../dtos/createFormation';
import { DeleteFormationDto } from '../dtos/deleteFormation';
import { UpdateFormationDto } from '../dtos/updateFormation';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private formationsRepository: Repository<Formation>,
  ) {}
  findFormations() {
    return this.formationsRepository.find();
  }

  createFormation(formationDetails: CreateFormationDto) {
    const newFormation = this.formationsRepository.create(formationDetails);
    console.log('Before save:', newFormation);
    const savedFormation = this.formationsRepository.save(newFormation);
    console.log('After save:', savedFormation);
    return savedFormation;
  }

  deleteFormation(formationId: DeleteFormationDto) {
    return this.formationsRepository.delete(formationId);
  }

  updateFormation(id: number, updateFormationDetails: UpdateFormationDto) {
    return this.formationsRepository.update(
      { id },
      { ...updateFormationDetails },
    );
  }
}
