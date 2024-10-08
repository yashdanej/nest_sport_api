import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Team } from './teams.entity';
import { Venue } from './venue.entity';
import { Competition } from './competitions.entity';
import { MatchInning } from './match-innings.entity';

@Entity('matches')
export class Matches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_match_id: number;

  @Column({ nullable: true })
  ref_liveline_match_id: string;

  @Column('text', { nullable: true })
  title: string;

  @Column('text', { nullable: true })
  short_title: string;

  @Column('text', { nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  format_str: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  status_str: string;

  @Column('text', { nullable: true })
  status_note: string;

  @Column({ nullable: true })
  verified: string;

  @Column({ nullable: true })
  pre_squad: string;

  @Column({ nullable: true })
  odds_available: string;

  @Column({ nullable: true })
  game_state: number;

  @Column({ nullable: true })
  game_state_str: string;

  @Column({ nullable: true })
  domestic: string;

  @Column({ nullable: true })
  competition_id: string;

  @ManyToOne(() => Competition, { eager: true }) // Assuming it's a Many-to-One relation with Venue entity
  @JoinColumn({ name: 'competition_id' }) // Foreign key column in the Matches table
  competition: Competition;

  @ManyToOne(() => Team, { eager: true }) // Assuming it's a Many-to-One relation with Team entity
  @JoinColumn({ name: 'teama' }) // Foreign key column in the Matches table
  teama: Team;

  @ManyToOne(() => Team, { eager: true }) // Assuming it's a Many-to-One relation with Team entity
  @JoinColumn({ name: 'teamb' }) // Foreign key column in the Matches table
  teamb: Team;

  @Column({ nullable: true, type: 'datetime' })
  date_start: Date;

  @Column({ nullable: true, type: 'datetime' })
  date_end: Date;

  @Column({ nullable: true, type: 'datetime' })
  date_start_ist: Date;

  @Column({ nullable: true, type: 'datetime' })
  date_end_ist: Date;

  @Column({ nullable: true })
  venue_id: string;

  @ManyToOne(() => Venue, { eager: true }) // Assuming it's a Many-to-One relation with Venue entity
  @JoinColumn({ name: 'venue_id' }) // Foreign key column in the Matches table
  venue: Venue;

  @Column('text', { nullable: true })
  umpires: string;

  @Column('text', { nullable: true })
  referee: string;

  @Column('text', { nullable: true })
  equation: string;

  @Column('text', { nullable: true })
  live: string;

  @Column('text', { nullable: true })
  result: string;

  @Column({ nullable: true })
  result_type: string;

  @Column({ nullable: true })
  win_margin: string;

  @Column({ nullable: true })
  winning_team_id: string;

  @Column({ nullable: true })
  commentary: string;

  @Column({ nullable: true })
  wagon: string;

  @Column({ nullable: true })
  latest_inning_number: string;

  @Column({ nullable: true, type: 'datetime' })
  presquad_time: Date;

  @Column({ nullable: true, type: 'datetime' })
  verify_time: Date;

  @Column('text', { nullable: true })
  toss_text: string;

  @Column({ nullable: true })
  toss_winner_id: string;

  @Column({ nullable: true })
  toss_decision: string;

  @Column({ default: 0 })
  is_scorecard_done: number;

  @Column('text', { nullable: true })
  liveline_json: string;

  @Column('text', { nullable: true })
  json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => MatchInning, inning => inning.match)
  innings: MatchInning[];
}
