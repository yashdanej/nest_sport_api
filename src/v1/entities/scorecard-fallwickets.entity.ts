import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('scorecard_fallwickets')
export class ScorecardFallwicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inning_id: number;

  @Column({ nullable: true })
  batsman_id: number;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  balls: string;

  @Column({ nullable: true })
  how_out: string;

  @Column({ nullable: true })
  score_at_dismissal: string;

  @Column({ nullable: true })
  overs_at_dismissal: string;

  @Column({ nullable: true })
  bowler_id: number;

  @Column({ nullable: true })
  dismissal: string;

  @Column({ nullable: true })
  number: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
