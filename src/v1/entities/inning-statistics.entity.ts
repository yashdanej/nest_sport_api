import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ScorecardFallwicket } from './scorecard-fallwickets.entity';

@Entity('innning_statistics') // Corrected typo to 'innning_statistics'
export class InnningStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ref_inning_id: number;

  @Column({ nullable: true })
  inning_id: number;

  @Column({ nullable: true })
  match_id: number;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  runs: string;

  @Column({ nullable: true })
  overs: string;

  @Column({ nullable: true })
  wickets: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  batting_team_id: string;

  @Column({ nullable: true })
  fielding_team_id: string;

  @Column({ type: 'text', nullable: true })
  manhattan_json: string;

  @Column({ type: 'text', nullable: true })
  worm_json: string;

  @Column({ type: 'text', nullable: true })
  runrates_json: string;

  @Column({ type: 'text', nullable: true })
  runtypes_json: string;

  @Column({ type: 'text', nullable: true })
  wickets_json: string;

  @Column({ type: 'text', nullable: true })
  extras_json: string;

  @Column({ type: 'text', nullable: true })
  partnership_json: string;

  @Column({ type: 'text', nullable: true })
  p2p_json: string;

  // Define relationships or other properties as needed

  @OneToMany(() => ScorecardFallwicket, fow => fow.inning_id)
  fows: ScorecardFallwicket[];

  // Optional: Define statistics property as per your need
  statistics: {
    manhattan: any;
    worm: any;
    runrates: any;
    partnership: any;
    runtypes: any;
    wickets: any;
    p2p: any;
    extras: any;
  };

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
