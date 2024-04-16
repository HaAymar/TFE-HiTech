import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'formations' })
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  photo: string;
}
