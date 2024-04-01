import { IsNotEmpty, IsNumber } from 'class-validator';

export interface IFormationsCreationInfo {
  name: string;
  formationId: number;
}

export class DeleteCourseDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
