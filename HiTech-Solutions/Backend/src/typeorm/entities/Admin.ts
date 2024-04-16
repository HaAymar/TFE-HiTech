import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Entity('Admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_userId' })
  user: User;
}
