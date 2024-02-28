import { IsNotEmpty, IsNumber } from 'class-validator';

export interface IFormationsCreationInfo {
  name: string;
  description: string;
  photo: string;
}

export class DeleteFormationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
