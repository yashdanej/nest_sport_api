// player-statistics-batting.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './players.entity';

@Entity('player_stastic_battings')
export class PlayerStatisticsBatting {
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
  notout: string;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  balls: string;

  @Column({ nullable: true })
  highest: string;

  @Column({ nullable: true, name: 'run100' })
  run_100: string;

  @Column({ nullable: true, name: 'run50' })
  run_50: string;

  @Column({ nullable: true, name: 'run4' })
  run_4: string;

  @Column({ nullable: true, name: 'run6' })
  run_6: string;

  @Column({ nullable: true })
  average: string;

  @Column({ nullable: true })
  strike: string;

  @Column({ nullable: true })
  catches: string;

  @Column({ nullable: true })
  stumpings: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Player, player => player.batting)
  @JoinColumn({ name: 'player_id' })
  player: Player;
}
