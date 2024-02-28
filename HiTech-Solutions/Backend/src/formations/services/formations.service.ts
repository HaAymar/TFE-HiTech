import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Service } from '../../typeorm/entities/Services';
import { CreateFormationDto } from '../dtos/createFormation';
import { DeleteFormationDto } from '../dtos/deleteFormation';
import { UpdateFormationDto } from '../dtos/updateFormation';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Service)
    private formationsRepository: Repository<Service>,
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
