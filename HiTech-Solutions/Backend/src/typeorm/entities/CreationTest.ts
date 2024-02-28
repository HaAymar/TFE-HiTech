import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from './Courses';
import { User } from './User';

@Entity()
export class CreationTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'date_test', type: 'date', nullable: true })
  dateTest: Date;

  @Column({ type: 'enum', enum: ['Yes', 'No'], default: 'No' })
  validation: string;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => User)
  user: User;
}
