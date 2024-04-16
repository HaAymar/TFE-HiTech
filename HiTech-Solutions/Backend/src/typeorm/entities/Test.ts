import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreationTest } from './CreationTest';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CreationTest)
  @JoinColumn({ name: 'id_creatTest' })
  creationTest: CreationTest;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'id_student' })
  student: Student;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'id_teacher' })
  teacher: Teacher;

  @Column()
  score: number;

  @Column({ type: 'enum', enum: ['Yes', 'No'], default: 'No' })
  validation: 'Yes' | 'No';
}
