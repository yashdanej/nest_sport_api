import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Competition } from './competitions.entity'; // Adjust path as per your project structure

@Entity('rounds')
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  competition_id: number;

  @ManyToOne(() => Competition, competition => competition.rounds)
  @JoinColumn({ name: 'competition_id' }) // Ensure this matches the column name in your database
  competition: Competition;

  @Column({ nullable: true })
  ref_round_id: number;

  @Column({ nullable: true })
  order_no: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'date', nullable: true })
  datestart: Date;

  @Column({ type: 'date', nullable: true })
  dateend: Date;

  @Column({ nullable: true })
  match_format: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
