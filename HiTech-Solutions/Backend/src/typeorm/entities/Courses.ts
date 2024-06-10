import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Formation } from './Formations';

@Entity('Courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Formation)
  @JoinColumn({ name: 'id_formation' })
  formation: Formation;

}
