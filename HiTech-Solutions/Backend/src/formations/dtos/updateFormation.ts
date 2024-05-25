import { IsString, Length } from 'class-validator';

export interface IFormationsCreationInfo {
  name: string;
  description: string;
  logo: string;
}

export class UpdateFormationDto {
  @IsString()
  readonly name: string;

  @Length(0, 255)
  @IsString()
  readonly description: string;

  @IsString()
  readonly image?: string;
}
