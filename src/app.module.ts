import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { V1Module } from './v1/v1.module';
import { SportMiddleware } from './sport.middleware';
import { User } from './v1/entities/user.entity';
import { Sport } from './v1/entities/sport.entity';
import { Plan } from './v1/entities/plan.entity';
import { UserSubscription } from './v1/entities/user-subscription.entity';
import { ApiCallLog } from './v1/entities/api-call-log.entity';
import { Season } from './v1/entities/seasons.entity';
import { Matches } from './v1/entities/matches.entity';
import { Competition } from './v1/entities/competitions.entity';
import { MatchesTeam } from './v1/entities/matches-teams.entity';
import { Team } from './v1/entities/teams.entity';
import { Player } from './v1/entities/players.entity';
import { LiveMatches } from './v1/entities/live-matches.entity';
import { MatchFantasyPoint } from './v1/entities/match-fantasy-points.entity';
import { MatchInning } from './v1/entities/match-innings.entity';
import { IccRanking } from './v1/entities/icc-rankings.entity';
import { IccGroup } from './v1/entities/icc-groups.entity';
import { InnningStatistic } from './v1/entities/inning-statistics.entity';
import { ScorecardFallwicket } from './v1/entities/scorecard-fallwickets.entity';
import { CompetitionStanding } from './v1/entities/competition-standing.entity';
import { Json } from './v1/entities/json.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Yash@1212888',
      database: 'pappapi',
      entities: [User, Sport, Plan, UserSubscription, ApiCallLog, Season, Matches, Competition, MatchesTeam, Team, Player, LiveMatches, MatchFantasyPoint, MatchInning, IccRanking, IccGroup, InnningStatistic, ScorecardFallwicket, CompetitionStanding, Json],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Sport, Plan, UserSubscription, ApiCallLog, Season, Matches, Competition, MatchesTeam, Team, Player, LiveMatches, MatchFantasyPoint, MatchInning, IccRanking, IccGroup, InnningStatistic, ScorecardFallwicket, CompetitionStanding, Json]),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SportMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}