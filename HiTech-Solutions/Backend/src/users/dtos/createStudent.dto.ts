import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  id_userId: number;

  @IsInt()
  id_role: number;

  @IsOptional()
  @IsDateString()
  dateFin?: Date;
}
