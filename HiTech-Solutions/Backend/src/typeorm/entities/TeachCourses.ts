import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './Courses';
import { User } from './User';

@Entity()
export class TeachersCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  user: User;
}
