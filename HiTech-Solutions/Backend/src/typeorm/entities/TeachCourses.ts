import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './Courses';
import { Teacher } from './Teacher';

@Entity()
export class TeachersCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'id_course' })
  course: Course;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'id_teacher' })
  teacher: Teacher;
}
