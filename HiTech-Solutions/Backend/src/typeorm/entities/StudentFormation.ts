import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Formation } from './Formations';
import { Student } from './Student';

@Entity()
export class StudentsFormation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'id_student' })
  student: Student;

  @ManyToOne(() => Formation)
  @JoinColumn({ name: 'id_formation' })
  formation: Formation;
}
