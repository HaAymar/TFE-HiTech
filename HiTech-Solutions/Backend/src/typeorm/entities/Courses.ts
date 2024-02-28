import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Section } from './Section';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Section)
  section: Section;
}
