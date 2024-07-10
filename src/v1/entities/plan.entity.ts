import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  api_call: string;

  @Column({ nullable: true })
  api_calls: number;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  validity: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
