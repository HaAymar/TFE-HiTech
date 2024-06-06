import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @IsInt()
  @IsNotEmpty()
  id_user: number;

  @IsInt()
  @IsNotEmpty()
  id_role: number;
}
