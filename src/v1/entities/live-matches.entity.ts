import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('live_matches')
export class LiveMatches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  status_str: string;

  @Column({ nullable: true })
  game_state: string;

  @Column({ nullable: true })
  game_state_str: string;

  @Column({ nullable: true })
  status_note: string;

  @Column({ nullable: true })
  team_batting: string;

  @Column({ nullable: true })
  team_bowling: string;

  @Column({ nullable: true })
  live_inning_number: number;

  @Column({ nullable: true })
  live_score_runs: string;

  @Column({ nullable: true })
  live_score_overs: string;

  @Column({ nullable: true })
  live_score_wickets: string;

  @Column({ nullable: true })
  live_score_target: string;

  @Column({ nullable: true })
  live_score_runrate: string;

  @Column({ nullable: true })
  live_score_required_runrate: string;

  @Column('text', { nullable: true })
  batsman_json: string;

  @Column('text', { nullable: true })
  bowlers_json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
