import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscription } from './v1/entities/user-subscription.entity';
import { ApiCallLog } from './v1/entities/api-call-log.entity';

@Injectable()
export class SportMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserSubscription)
    private readonly userSubscriptionRepository: Repository<UserSubscription>,
    @InjectRepository(ApiCallLog)
    private readonly apiCallLogRepository: Repository<ApiCallLog>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'] as string;
    console.log("token", token);
    
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'unauthorized',
        response: 'Invalid Token',
      });
    }

    const subscription = await this.findSubscriptionByToken(token);
    console.log("subscription", subscription);
    
    if (!subscription) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'unauthorized',
        response: 'Invalid Token',
      });
    }

    if (subscription.status === 0) {
      return res.status(HttpStatus.OK).json({
        status: true,
        response: 'Your Plan is inactive',
      });
    }
    
    if (new Date(subscription.expire_date) < new Date()) {
      return res.status(HttpStatus.OK).json({
        status: true,
        response: 'Your Plan is expired',
      });
    }

    const plan = subscription.plan;
    console.log("plan", plan);
    
    if (!plan) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'unauthorized',
        response: 'Invalid Plan',
      });
    }

    const planThreshold = +plan.api_call.split(' ')[0] || 100000;
    console.log("planThreshold", planThreshold);

    if (subscription.api_hits >= planThreshold) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: 'forbidden',
        response: 'API call limit reached',
      });
    }

    const normalizedUrl = this.normalizeUrl(req.path);

    await this.logApiCall(subscription.user.id, normalizedUrl);

    subscription.api_hits += 1;
    await this.updateSubscriptionApiHits(subscription);

    next();
  }

  protected normalizeUrl(url: string): string {
    return url.replace(/(?<=\/)\d+/g, '');
  }

  private async findSubscriptionByToken(token: string): Promise<UserSubscription | undefined> {
    return this.userSubscriptionRepository.findOne({
      where: { token },
      relations: ['plan', 'user'],
    });
  }

  // private async logApiCall(userId: number, endpoint: string) {
  //   try {
  //     const log = this.apiCallLogRepository.create({
  //       user: { id: userId },
  //       sportId: 1,
  //       endpoint,
  //     });
  //     console.log("logsss", log);
      
  //     const save = await this.apiCallLogRepository.save(log);
  //     console.log("save", save);
  //   } catch (error) {
  //     console.error("Error saving API call log:", error); // Log the error
  //   }
  // }
  private async logApiCall(userId: number, endpoint: string) {
    try {
        const log = this.apiCallLogRepository.create({
            user: { id: userId },  // This line assumes that the user entity has an ID field
            sportId: 1,            // Hardcoded sportId as per your requirement
            endpoint,              // The endpoint being accessed
        });
        console.log("logsss", log);
        
        const save = await this.apiCallLogRepository.save(log);
        console.log("save", save);
    } catch (error) {
        console.error("Error saving API call log:", error);
    }
}

  private async updateSubscriptionApiHits(subscription: UserSubscription) {
    await this.userSubscriptionRepository.save(subscription);
  }
}
