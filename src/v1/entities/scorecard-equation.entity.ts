import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity';

@Entity('scorecard_equations')
export class ScorecardEquation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inning_id: number;

  @ManyToOne(() => MatchInning, inning => inning.equations)
  @JoinColumn({ name: 'inning_id' })
  inning: MatchInning;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  wickets: string;

  @Column({ nullable: true })
  overs: string;

  @Column({ nullable: true })
  bowlers_used: string;

  @Column({ nullable: true })
  runrate: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
