import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Entity('Students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_userId' })
  user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @Column({ type: 'date' })
  dateInscription: Date;

  @Column({ type: 'date', nullable: true })
  dateFin: Date;
}
