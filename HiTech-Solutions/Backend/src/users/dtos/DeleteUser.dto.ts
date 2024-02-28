import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNumber()
  readonly idRole: number;

  @IsNumber()
  readonly idSection: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString()
  readonly email: string;

  @IsNumber()
  readonly tel: string;

  @IsNotEmpty()
  @IsDate()
  readonly dateInscription: Date;

  @IsDate()
  readonly dateDeFin: Date;

  @IsString()
  readonly password: string;
}
