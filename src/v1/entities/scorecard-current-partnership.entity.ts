import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ScorecardCurrentPartnershipBatsman } from './scorecard-current-partnership-batsman.entity';

@Entity('scorecard_current_partnerships')
export class ScorecardCurrentPartnership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inning_id: number;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  balls: string;

  @Column({ nullable: true })
  overs: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => ScorecardCurrentPartnershipBatsman, batsman => batsman.partnership)
  batsmen: ScorecardCurrentPartnershipBatsman[];
}
