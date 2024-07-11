import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity'; // Adjust this import based on your entity structure
import { Player } from './players.entity'; // Import Player entity if exists

@Entity('scorecard_not_bats')
export class ScorecardNotBat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inning_id: number;

  @ManyToOne(() => MatchInning, inning => inning.did_not_bat)
  @JoinColumn({ name: 'inning_id' })
  inning: MatchInning;

  @Column()
  player_id: number;

  @ManyToOne(() => Player, player => player.id) // Adjust Player entity if exists
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
