import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport_id: number;

  @Column({ nullable: true })
  ref_team_id: number;

  @Column({ nullable: true })
  ref_liveline_team_id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  thumb_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  alt_name: string;

  @Column({ nullable: true })
  abbr: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at: Date;
}
