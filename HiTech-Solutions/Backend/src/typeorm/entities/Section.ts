import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.section)
  users: User[];
}
