import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MatchInning } from './match-innings.entity'; // Adjust this import based on your entity structure

@Entity('scorecard_fielders')
export class ScorecardFielder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_fielder_id: number;

  @Column({ nullable: true })
  fielder_id: number;

  @Column()
  inning_id: number;

  @ManyToOne(() => MatchInning, inning => inning.fielders)
  @JoinColumn({ name: 'inning_id' })
  inning: MatchInning;

  @Column({ nullable: true })
  catches: number;

  @Column({ nullable: true })
  runout_thrower: string;

  @Column({ nullable: true })
  runout_catcher: string;

  @Column({ nullable: true })
  runout_direct_hit: string;

  @Column({ nullable: true })
  stumping: string;

  @Column({ nullable: true })
  is_substitute: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
