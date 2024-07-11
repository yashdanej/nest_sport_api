import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity';

@Entity('scorecard_bowlers')
export class ScorecardBowler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bowler_id: number;

  @Column()
  inning_id: number;

  @ManyToOne(() => MatchInning, matchInning => matchInning.bowlers)
  @JoinColumn({ name: 'inning_id' })
  matchInning: MatchInning;

  @Column({ nullable: true })
  ref_bowler_id: number;

  @Column({ nullable: true })
  ref_liveline_bowler_id: number;

  @Column({ nullable: true })
  bowling: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  overs: string;

  @Column({ nullable: true })
  maidens: string;

  @Column({ nullable: true })
  runs_conceded: string;

  @Column({ nullable: true })
  wickets: string;

  @Column({ nullable: true })
  noballs: string;

  @Column({ nullable: true })
  wides: string;

  @Column({ nullable: true })
  econ: string;

  @Column({ nullable: true })
  run0: string;

  @Column({ nullable: true })
  bowledcount: string;

  @Column({ nullable: true })
  lbwcount: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
