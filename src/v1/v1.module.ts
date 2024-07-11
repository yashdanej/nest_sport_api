import { Module } from '@nestjs/common';
import { V1Service } from './v1.service';
import { V1Controller } from './v1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/seasons.entity';
import { Json } from './entities/json.entity';
import { Competition } from './entities/competitions.entity';
import { User } from './entities/user.entity';
import { Sport } from './entities/sport.entity';
import { Plan } from './entities/plan.entity';
import { UserSubscription } from './entities/user-subscription.entity';
import { ApiCallLog } from './entities/api-call-log.entity';
import { Matches } from './entities/matches.entity';
import { MatchesTeam } from './entities/matches-teams.entity';
import { Team } from './entities/teams.entity';
import { Player } from './entities/players.entity';
import { LiveMatches } from './entities/live-matches.entity';
import { MatchFantasyPoint } from './entities/match-fantasy-points.entity';
import { MatchInning } from './entities/match-innings.entity';
import { IccRanking } from './entities/icc-rankings.entity';
import { IccGroup } from './entities/icc-groups.entity';
import { InnningStatistic } from './entities/inning-statistics.entity';
import { CompetitionStanding } from './entities/competition-standing.entity';
import { Round } from './entities/round.entity';
import { Venue } from './entities/venue.entity';
import { Commentary } from './entities/commentary.entity';
import { ScorecardFallwicket } from './entities/scorecard-fallwickets.entity';
import { ScorecardBatsman } from './entities/scorecard-batsman.entity';
import { ScorecardBowler } from './entities/scorecard-bowler.entity';
import { ScorecardCurrentPartnership } from './entities/scorecard-current-partnership.entity';
import { ScorecardEquation } from './entities/scorecard-equation.entity';
import { ScorecardCurrentPartnershipBatsman } from './entities/scorecard-current-partnership-batsman.entity';
import { ScorecardExtraRun } from './entities/scorecard-extra-run.entity';
import { ScorecardFielder } from './entities/scorecard-fielder.entity';
import { ScorecardNotBat } from './entities/scorecard-not-bat.entity';
import { PlayerStatisticsBatting } from './entities/player-statistics-batting.entity';
import { PlayerStatisticsBowling } from './entities/player-statistics-bowling.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venue, PlayerStatisticsBowling, PlayerStatisticsBatting, ScorecardFielder, ScorecardNotBat, ScorecardFallwicket, ScorecardBatsman, ScorecardBowler, ScorecardCurrentPartnership, ScorecardEquation, ScorecardCurrentPartnershipBatsman, ScorecardExtraRun, Commentary, User, Round, Sport, Plan, UserSubscription, ApiCallLog, Season, Matches, Competition, MatchesTeam, Team, Player, LiveMatches, MatchFantasyPoint, MatchInning, IccRanking, IccGroup, InnningStatistic, CompetitionStanding, Json]), // Include Season entity in TypeOrmModule
  ],
  controllers: [V1Controller],
  providers: [V1Service],
})
export class V1Module {}
