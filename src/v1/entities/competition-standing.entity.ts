import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('competition_standings')
export class CompetitionStanding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  competition_id: number;

  @Column({ nullable: true })
  round_id: number;

  @Column({ nullable: true })
  order_no: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  match_format: string;

  @Column({ nullable: true })
  datestart: string;

  @Column({ nullable: true })
  dateend: string;

  @Column({ nullable: true })
  team_id: string;

  @Column({ nullable: true })
  played: string;

  @Column({ nullable: true })
  win: string;

  @Column({ nullable: true })
  draw: string;

  @Column({ nullable: true })
  loss: string;

  @Column({ nullable: true })
  nr: string;

  @Column({ nullable: true })
  overfor: string;

  @Column({ nullable: true })
  runfor: string;

  @Column({ nullable: true })
  overagainst: string;

  @Column({ nullable: true })
  runagainst: string;

  @Column({ nullable: true })
  netrr: string;

  @Column({ nullable: true })
  points: string;

  @Column({ nullable: true })
  lastfivematch: string;

  @Column({ nullable: true })
  lastfivematchresult: string;

  @Column({ nullable: true })
  quality: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
