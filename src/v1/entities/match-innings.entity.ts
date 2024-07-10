import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('match_innings')
export class MatchInning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

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
}
