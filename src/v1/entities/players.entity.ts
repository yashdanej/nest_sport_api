// player.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PlayerStatisticsBatting } from './player-statistics-batting.entity';
import { PlayerStatisticsBowling } from './player-statistics-bowling.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_player_id: number;

  @Column({ nullable: true })
  ref_liveline_player_id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  short_name: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column({ nullable: true })
  birthplace: string;

  @Column({ nullable: true })
  country: string;

  @Column('text', { nullable: true })
  primary_team: string;

  @Column('text', { nullable: true })
  thumb_url: string;

  @Column('text', { nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  playing_role: string;

  @Column({ nullable: true })
  batting_style: string;

  @Column({ nullable: true })
  bowling_style: string;

  @Column({ nullable: true })
  fielding_position: string;

  @Column({ nullable: true })
  recent_match: string;

  @Column({ nullable: true })
  recent_appearance: string;

  @Column({ nullable: true })
  fantasy_player_rating: string;

  @Column({ nullable: true })
  t: string;

  @Column({ nullable: true })
  nationality: number;

  @Column('text', { nullable: true })
  json: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @OneToMany(() => PlayerStatisticsBatting, batting => batting.player)
  batting: PlayerStatisticsBatting[];

  @OneToMany(() => PlayerStatisticsBowling, bowling => bowling.player)
  bowling: PlayerStatisticsBowling[];
}
