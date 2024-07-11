import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Matches } from './matches.entity';
import { Player } from './players.entity';
import { Team } from './teams.entity';

@Entity('matches_teams')
export class MatchesTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @ManyToOne(() => Matches, { eager: false })
  @JoinColumn({ name: 'match_id' })
  match: Matches;

  @Column()
  team_id: number;

  @ManyToOne(() => Team, { eager: true }) // Assuming Team entity exists and is imported correctly
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column()
  player_id: number;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  substitute: string;

  @Column({ nullable: true })
  role_str: string;

  @Column({ nullable: true })
  playing11: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
