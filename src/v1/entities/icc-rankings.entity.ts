import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('icc_rankings')
export class IccRanking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  group_name: string;

  @Column({ nullable: true })
  format: string;

  @Column({ type: 'text', nullable: true })
  json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
