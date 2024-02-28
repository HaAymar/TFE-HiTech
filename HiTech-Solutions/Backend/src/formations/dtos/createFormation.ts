import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface IFormationsCreationInfo {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export class CreateFormationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
