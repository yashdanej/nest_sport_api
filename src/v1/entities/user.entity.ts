import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { ApiCallLog } from './api-call-log.entity';
  import { UserSubscription } from './user-subscription.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    lastname: string;
  
    @Column()
    email: string;
  
    @Column({ nullable: true })
    image: string;
  
    @Column({ type: 'timestamp', nullable: true })
    email_verified_at: Date;
  
    @Column()
    password: string;
  
    @Column({ nullable: true })
    gender: string;
  
    @Column({ type: 'date', nullable: true })
    dob: Date;
  
    @Column({ nullable: true })
    location: string;
  
    @Column({ nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    language: string;
  
    @Column({ nullable: true })
    skills: string;
  
    @Column({ nullable: true })
    secret_key: string;
  
    @Column({ nullable: true })
    remember_token: string;
  
    @Column({ nullable: true })
    reffer_code: string;
  
    @Column({ nullable: true })
    reffer_by: string;
  
    @Column({ type: 'int', default: null, comment: '0=>no;1=>yes' })
    is_operator: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  
    @Column({ type: 'tinyint', default: 0 })
    role: number;
  
    @Column({ type: 'int', default: 1, comment: '1=active,0=deactive' })
    status: number;
  
    @OneToMany(() => ApiCallLog, (apiCallLog) => apiCallLog.user)
    apiCallLogs: ApiCallLog[];
  
    @OneToMany(() => UserSubscription, (userSubscription) => userSubscription.user)
    userSubscriptions: UserSubscription[];
  }