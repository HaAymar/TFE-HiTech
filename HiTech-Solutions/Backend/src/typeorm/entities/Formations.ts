import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from './Courses';
import { User } from './User';

@Entity({ name: 'formations' })
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Course, (course) => course.formation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  courses: Course[];
}
