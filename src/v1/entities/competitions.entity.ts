// src/entities/competition.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Round } from './round.entity'; // Adjust path as per your project structure

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  season_id: number;

  @Column({ nullable: true })
  ref_competition_id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  abbr: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  match_format: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true, type: 'date' })
  datestart: Date;

  @Column({ nullable: true, type: 'date' })
  dateend: Date;

  @Column({ nullable: true })
  total_matches: string;

  @Column({ nullable: true })
  total_rounds: string;

  @Column({ nullable: true })
  total_teams: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  game_format: string;

  @Column('text', { nullable: true })
  json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => Round, round => round.competition)
  rounds: Round[];
}
