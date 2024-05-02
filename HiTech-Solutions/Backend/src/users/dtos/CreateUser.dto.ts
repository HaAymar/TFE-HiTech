export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly tel: string;
  readonly role: string;
  readonly courses?: { courseId: number }[];
  readonly formations?: { formationId: number }[];
  readonly password: string;
}
