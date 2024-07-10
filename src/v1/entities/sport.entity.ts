import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sport')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
