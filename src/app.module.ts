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
import { Round } from './v1/entities/round.entity';
import { Venue } from './v1/entities/venue.entity';
import { Commentary } from './v1/entities/commentary.entity';
import { ScorecardFielder } from './v1/entities/scorecard-fielder.entity';
import { ScorecardNotBat } from './v1/entities/scorecard-not-bat.entity';
import { ScorecardBatsman } from './v1/entities/scorecard-batsman.entity';
import { ScorecardBowler } from './v1/entities/scorecard-bowler.entity';
import { ScorecardCurrentPartnership } from './v1/entities/scorecard-current-partnership.entity';
import { ScorecardEquation } from './v1/entities/scorecard-equation.entity';
import { ScorecardCurrentPartnershipBatsman } from './v1/entities/scorecard-current-partnership-batsman.entity';
import { ScorecardExtraRun } from './v1/entities/scorecard-extra-run.entity';
import { PlayerStatisticsBatting } from './v1/entities/player-statistics-batting.entity';
import { PlayerStatisticsBowling } from './v1/entities/player-statistics-bowling.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Yash@1212888',
      database: 'pappapi',
      entities: [User, PlayerStatisticsBatting, PlayerStatisticsBowling, ScorecardFielder, ScorecardNotBat, ScorecardFallwicket, ScorecardBatsman, ScorecardBowler, ScorecardCurrentPartnership, ScorecardEquation, ScorecardCurrentPartnershipBatsman, ScorecardExtraRun, Commentary, Venue, Round, Sport, Plan, UserSubscription, ApiCallLog, Season, Matches, Competition, MatchesTeam, Team, Player, LiveMatches, MatchFantasyPoint, MatchInning, IccRanking, IccGroup, InnningStatistic, CompetitionStanding, Json],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, PlayerStatisticsBatting, PlayerStatisticsBowling, ScorecardFielder, ScorecardNotBat, ScorecardFallwicket, ScorecardBatsman, ScorecardBowler, ScorecardCurrentPartnership, ScorecardEquation, ScorecardCurrentPartnershipBatsman, ScorecardExtraRun, Commentary, Venue, Round, Sport, Plan, UserSubscription, ApiCallLog, Season, Matches, Competition, MatchesTeam, Team, Player, LiveMatches, MatchFantasyPoint, MatchInning, IccRanking, IccGroup, InnningStatistic, CompetitionStanding, Json]),
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