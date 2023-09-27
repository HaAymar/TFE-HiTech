/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
