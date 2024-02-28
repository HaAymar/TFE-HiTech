export type CreateUserParams = {
  readonly idRole: number;
  readonly idSection: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly tel: string;
  readonly dateInscription: Date;
  readonly dateDeFin: Date;
  readonly password: string;
};

export type UpdateUserParams = {
  readonly idRole: number;
  readonly idSection: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly tel: string;
  readonly dateInscription: Date;
  readonly dateDeFin: Date;
  readonly password: string;
};

export type DeleteUserParams = {
  readonly idRole: number;
  readonly idSection: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly tel: string;
  readonly dateInscription: Date;
  readonly dateDeFin: Date;
  readonly password: string;
};
