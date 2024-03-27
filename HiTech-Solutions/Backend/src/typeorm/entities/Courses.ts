import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Formation } from './Formations';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => TeachersCourses, (teachersCourses) => teachersCourses.course)
  // teachersCourses: TeachersCourses[];

  @ManyToOne(() => Formation, (formation) => formation.courses)
  formation: Formation;
}
