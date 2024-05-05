import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCreationTestDto {
  @IsInt()
  @IsNotEmpty()
  id_course: number;

  @IsInt()
  @IsNotEmpty()
  id_teacher: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dateTest: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  cotation?: string;

  @IsNotEmpty()
  validation: 'Yes' | 'No';
}
