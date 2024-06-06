import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignFormationDto {
  @IsInt()
  @IsNotEmpty()
  id_student: number;

  @IsInt()
  @IsNotEmpty()
  id_formation: number;
}
