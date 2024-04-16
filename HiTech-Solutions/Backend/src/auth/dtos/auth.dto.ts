import { IsString } from 'class-validator';

export class AuthPayloadDto {
  // @IsNumber()
  // UserId: number;

  // @IsString()
  // Name: string;

  // @IsString()
  // Surname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  roleName?: string;
}
