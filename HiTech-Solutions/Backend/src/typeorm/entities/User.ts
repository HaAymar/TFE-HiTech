import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Formation } from './Formations';
import { Role } from './Role';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ name: 'date_inscription', type: 'date', nullable: true })
  dateInscription: Date;

  @Column({ name: 'date_de_fin', type: 'date', nullable: true })
  dateDeFin: Date;

  @Column()
  password: string;

  @ManyToOne(() => Formation, (formation) => formation.user)
  formation: Formation;

  @ManyToOne(() => Role)
  role: Role;
}
