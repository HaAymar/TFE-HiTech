import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './Role';
import { StudentsFormation } from './StudentFormation';
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

  @OneToMany(
    () => StudentsFormation,
    (studentsFormation) => studentsFormation.student,
  )
  studentsFormations: StudentsFormation[];
}
