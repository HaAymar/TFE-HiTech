import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from './Courses';
import { Teacher } from './Teacher';

@Entity()
export class CreationTest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'id_course' })
  course: Course;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'id_teacher' })
  teacher: Teacher;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dateTest: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  cotation: string;

  @Column({ type: 'enum', enum: ['Yes', 'No'], default: 'No' })
  validation: 'Yes' | 'No';
}
