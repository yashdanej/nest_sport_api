import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('matches_teams')
export class MatchesTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @Column()
  team_id: number;

  @Column()
  player_id: number;

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
