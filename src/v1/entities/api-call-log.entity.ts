import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity('api_call_logs')
  export class ApiCallLog {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ManyToOne(() => User, (user) => user.apiCallLogs, { onDelete: 'CASCADE' })
    user: User;
  
    @Column()
    endpoint: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  