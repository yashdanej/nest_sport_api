import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity';

@Entity('scorecard_batmens')
export class ScorecardBatsman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  batsman_id: number;

  @Column()
  inning_id: number;

  @ManyToOne(() => MatchInning, matchInning => matchInning.batsmans)
  @JoinColumn({ name: 'inning_id' })
  matchInning: MatchInning;

  @Column({ nullable: true })
  ref_batsman_id: number;

  @Column({ nullable: true })
  ref_liveline_batsman_id: number;

  @Column({ nullable: true })
  batting: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  role_str: string;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  balls_faced: string;

  @Column({ nullable: true })
  fours: string;

  @Column({ nullable: true })
  sixes: string;

  @Column({ nullable: true })
  run0: string;

  @Column({ nullable: true })
  run1: string;

  @Column({ nullable: true })
  run2: string;

  @Column({ nullable: true })
  run3: string;

  @Column({ nullable: true })
  run5: string;

  @Column({ nullable: true })
  how_out: string;

  @Column({ nullable: true })
  dismissal: string;

  @Column({ nullable: true })
  strike_rate: string;

  @Column({ nullable: true })
  bowler_id: string;

  @Column({ nullable: true })
  first_fielder_id: number;

  @Column({ nullable: true })
  second_fielder_id: number;

  @Column({ nullable: true })
  third_fielder_id: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
