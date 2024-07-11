// player-statistics-bowling.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './players.entity';

@Entity('player_stastic_bowlings')
export class PlayerStatisticsBowling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  player_id: number;

  @Column({ nullable: true })
  format_type: string;

  @Column({ nullable: true })
  matches: string;

  @Column({ nullable: true })
  innings: string;

  @Column({ nullable: true })
  balls: string;

  @Column({ nullable: true })
  overs: string;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  wickets: string;

  @Column({ nullable: true })
  econ: string;

  @Column({ nullable: true })
  average: string;

  @Column({ nullable: true })
  strike: string;

  @Column({ nullable: true })
  bestinning: string;

  @Column({ nullable: true })
  bestmatch: string;

  @Column({ nullable: true, name: 'wicket4i' })
  wicket_4i: string;

  @Column({ nullable: true, name: 'wicket5i' })
  wicket_5i: string;

  @Column({ nullable: true, name: 'wicket10m' })
  wicket_10m: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Player, player => player.bowling)
  @JoinColumn({ name: 'player_id' })
  player: Player;
}
