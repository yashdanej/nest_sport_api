import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity';

@Entity('scorecard_extra_runs')
export class ScorecardExtraRun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  inning_id: number;

  @ManyToOne(() => MatchInning, inning => inning.extra_runs)
  @JoinColumn({ name: 'inning_id' })
  inning: MatchInning;

  @Column({ nullable: true })
  byes: string;

  @Column({ nullable: true })
  legbyes: string;

  @Column({ nullable: true })
  wides: string;

  @Column({ nullable: true })
  noballs: string;

  @Column({ nullable: true })
  penalty: string;

  @Column({ nullable: true })
  total: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
