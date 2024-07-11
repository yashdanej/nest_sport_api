import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ScorecardCurrentPartnership } from './scorecard-current-partnership.entity';

@Entity('scorecard_current_partnership_batsmen')
export class ScorecardCurrentPartnershipBatsman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  partnership_id: number;

  @ManyToOne(() => ScorecardCurrentPartnership, partnership => partnership.batsmen)
  @JoinColumn({ name: 'partnership_id' })
  partnership: ScorecardCurrentPartnership;

  @Column({ nullable: true })
  batsman_id: number;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  balls: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
