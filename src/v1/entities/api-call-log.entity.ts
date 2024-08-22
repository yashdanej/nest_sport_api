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
    
    @Column({ type: 'int', nullable: true })
    sportId: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'tinyint', default: 0 }) // Add the failed column
    failed: number; // Using `number` for tinyint (0 or 1)

  }
  