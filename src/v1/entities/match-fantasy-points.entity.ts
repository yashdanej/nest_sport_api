import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('match_fantasy_points')
export class MatchFantasyPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match_id: number;

  @Column()
  team_id: number;

  @Column()
  player_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  point: string;

  @Column({ nullable: true })
  starting11: string;

  @Column({ nullable: true })
  run: string;

  @Column({ nullable: true })
  four: string;

  @Column({ nullable: true })
  six: string;

  @Column({ nullable: true })
  sr: string;

  @Column({ nullable: true })
  fifty: string;

  @Column({ nullable: true })
  duck: string;

  @Column({ nullable: true })
  wkts: string;

  @Column({ nullable: true })
  maidenover: string;

  @Column({ nullable: true })
  er: string;

  @Column({ nullable: true })
  catch: string;

  @Column({ nullable: true })
  runoutstumping: string;

  @Column({ nullable: true })
  runoutthrower: string;

  @Column({ nullable: true })
  runoutcatcher: string;

  @Column({ nullable: true })
  directrunout: string;

  @Column({ nullable: true })
  stumping: string;

  @Column({ nullable: true })
  thirty: string;

  @Column({ nullable: true })
  bonus: string;

  @Column({ nullable: true })
  bonuscatch: string;

  @Column({ nullable: true })
  bonusbowedlbw: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
