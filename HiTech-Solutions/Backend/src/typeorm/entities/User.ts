import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Admin } from './Admin';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  tel: string;

  // Define relationships
  @OneToMany(() => Admin, (admin) => admin.user)
  admins: Admin[];

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.user)
  teachers: Teacher[];
}
