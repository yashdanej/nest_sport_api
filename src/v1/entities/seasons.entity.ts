import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('seasons')
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_season_id: string;

  @Column({ nullable: true })
  name: string;

  @Column('text', { nullable: true })
  competitions_url: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
