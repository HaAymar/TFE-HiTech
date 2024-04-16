import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './Role';
import { TeachersCourse } from './TeachCourses';
import { User } from './User';

@Entity('Teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_userId' })
  user: User;

  @OneToMany(() => TeachersCourse, (teachersCourse) => teachersCourse.teacher)
  teachersCourses: TeachersCourse[];
}
