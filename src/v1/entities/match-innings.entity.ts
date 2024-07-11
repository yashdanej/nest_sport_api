import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Matches } from './matches.entity';
import { ScorecardBatsman } from './scorecard-batsman.entity';
import { ScorecardBowler } from './scorecard-bowler.entity';
import { ScorecardFielder } from './scorecard-fielder.entity';
import { ScorecardFallwicket } from './scorecard-fallwickets.entity';
import { ScorecardNotBat } from './scorecard-not-bat.entity';
import { ScorecardExtraRun } from './scorecard-extra-run.entity';
import { ScorecardEquation } from './scorecard-equation.entity';
import { ScorecardCurrentPartnership } from './scorecard-current-partnership.entity';
import { Commentary } from './commentary.entity';

@Entity('match_innings')
export class MatchInning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @ManyToOne(() => Matches, match => match.innings)
  @JoinColumn({ name: 'match_id' })
  match: Matches;

  @Column({ nullable: true })
  ref_inning_id: number;

  @Column({ nullable: true })
  team_id: number;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  short_name: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  batting_team_id: number;

  @Column({ nullable: true })
  fielding_team_id: number;

  @Column({ nullable: true })
  scores: string;

  @Column({ nullable: true })
  scores_full: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => ScorecardBatsman, batsman => batsman.matchInning)
  batsmans: ScorecardBatsman[];

  @OneToMany(() => ScorecardBowler, bowler => bowler.matchInning)
  bowlers: ScorecardBowler[];

  @OneToMany(() => ScorecardFielder, fielder => fielder.inning_id)
  fielders: ScorecardFielder[];

  @OneToMany(() => ScorecardFallwicket, fallwicket => fallwicket.inning_id)
  fallwickets: ScorecardFallwicket[];

  @OneToMany(() => ScorecardNotBat, notbat => notbat.inning_id)
  did_not_bat: ScorecardNotBat[];

  @ManyToOne(() => ScorecardExtraRun, extrarun => extrarun.inning_id)
  extra_runs: ScorecardExtraRun;

  @ManyToOne(() => ScorecardEquation, equation => equation.inning_id)
  equations: ScorecardEquation;

  @ManyToOne(() => ScorecardCurrentPartnership, partnership => partnership.inning_id)
  current_partnership: ScorecardCurrentPartnership;

  @OneToMany(() => Commentary, commentary => commentary.matchInning)
  inningcommentaries: Commentary[];
}
