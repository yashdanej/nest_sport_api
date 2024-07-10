import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('jsons')
export class Json {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filename: string;

  @Column('longtext', { nullable: true })
  json: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
