import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('innning_statistics') // Note the typo in 'innning_statistics'
export class InnningStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_inning_id: number;

  @Column({ nullable: true })
  inning_id: number;

  @Column({ nullable: true })
  match_id: number;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  overs: string;

  @Column({ nullable: true })
  wickets: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  batting_team_id: string;

  @Column({ nullable: true })
  fielding_team_id: string;

  @Column({ type: 'text', nullable: true })
  manhattan_json: string;

  @Column({ type: 'text', nullable: true })
  worm_json: string;

  @Column({ type: 'text', nullable: true })
  runrates_json: string;

  @Column({ type: 'text', nullable: true })
  runtypes_json: string;

  @Column({ type: 'text', nullable: true })
  wickets_json: string;

  @Column({ type: 'text', nullable: true })
  extras_json: string;

  @Column({ type: 'text', nullable: true })
  partnership_json: string;

  @Column({ type: 'text', nullable: true })
  p2p_json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
