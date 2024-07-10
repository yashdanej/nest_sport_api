import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Plan } from './plan.entity';
  import { Sport } from './sport.entity';
  
  @Entity('user_subscriptions')
  export class UserSubscription {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Sport, (sport) => sport.id, { nullable: true })
    sport: Sport;
  
    @ManyToOne(() => User, (user) => user.userSubscriptions)
    user: User;
  
    @ManyToOne(() => Plan, (plan) => plan.id)
    plan: Plan;
  
    @Column({ type: 'date', nullable: true })
    start_date: Date;
  
    @Column({ type: 'date', nullable: true })
    expire_date: Date;
  
    @Column({ nullable: true })
    token: string;
  
    @Column({ nullable: true })
    api_hits: number;
  
    @Column({ type: 'int', default: 1, comment: '0=>inactive,1=>active' })
    status: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
  }
  