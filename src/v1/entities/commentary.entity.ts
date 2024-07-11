// src/commentary/commentary.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LiveMatches } from './live-matches.entity'; // Assuming you have a LiveMatches entity defined
import { MatchInning } from './match-innings.entity';

@Entity('commentaries')
export class Commentary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @ManyToOne(() => MatchInning, inning => inning.inningcommentaries)
  @JoinColumn({ name: 'match_inning_id' })
  matchInning: MatchInning;

  @ManyToOne(() => LiveMatches, liveMatch => liveMatch.commentaries, { eager: false })
  @JoinColumn({ name: 'match_id' })
  match: LiveMatches;

  @Column({ nullable: true })
  event: string;

  @Column({ nullable: true })
  batsman_id: number;

  @Column({ nullable: true })
  bowler_id: number;

  @Column({ nullable: true })
  live_inning_number: number;

  @Column({ nullable: true })
  over: string;

  @Column({ nullable: true })
  ball: string;

  @Column({ nullable: true })
  score: string;

  @Column('text', { nullable: true })
  commentary: string;

  @Column({ nullable: true })
  noball_dismissal: string;

  @Column({ nullable: true })
  text: string;

  @Column('text', { nullable: true })
  how_out: string;

  @Column({ nullable: true })
  wicket_batsman_id: string;

  @Column({ nullable: true })
  batsman_runs: string;

  @Column({ nullable: true })
  batsman_balls: string;

  @Column({ nullable: true })
  runs: string;

  @Column('text', { nullable: true })
  bats_json: string;

  @Column('text', { nullable: true })
  bowls_json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
