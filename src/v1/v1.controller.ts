import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query, Req } from '@nestjs/common';
import { V1Service } from './v1.service';
import { Competition } from './entities/competitions.entity';
import { Team } from './entities/teams.entity';
import { Matches } from './entities/matches.entity';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) { }

  @Get('seasons') // GET /v1/seasons
  async getSeasons() {
    const response = await this.v1Service.getSeasons();
    return response;
  }

  @Get('allseasons') // GET /v1/allseasons
  async allSeason() {
    const response = await this.v1Service.allSeason();
    return response;
  }

  @Get('seasons/competitions/:seasonId')
  async getSeasonCompetitions(
    @Param('seasonId', ParseIntPipe) seasonId: number,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.v1Service.getSeasonCompetitions(seasonId, limit, page);
  }

  @Get('competitions')
  async getCompetitions(@Query('limit') limit = 10): Promise<{ status: boolean, response: { competitions: Competition[], page_data: any } }> {
    const response = await this.v1Service.getCompetitions(Number(limit));
    return response;
  }

  @Get('competition-overview/:competition_id')
  async getCompetitionOverview(@Param('competition_id', ParseIntPipe) competitionId: number): Promise<{ status: boolean, response: { competition?: Competition } }> {
    const response = await this.v1Service.competitionOverview(competitionId);
    return response;
  }

  @Get('competitions/matches/:competition_id')
  async competitionMatches(
    @Param('competition_id', ParseIntPipe) competitionId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const response = await this.v1Service.competitionMatches(competitionId, page, limit);
    return response;
  }

  @Get('competitions/teams/:competitionId')
  async competitionTeams(@Param('competitionId') competitionId: number) {
    return this.v1Service.competitionTeams(competitionId);
  }

  @Get('competitions/standings/:competitionId')
  async competitionStandings(@Param('competitionId') competitionId: number) {
    return this.v1Service.competitionStandings(competitionId);
  }

  @Get('matches')
  async matches(
    @Query('status') status: string = '',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request
  ) {
    try {
      const result = await this.v1Service.matches(status, page, limit, req);
      console.log("result.status", result.status);
      console.log("result.response", result.response);
      return {
        status: result.status,
        response: result.response,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }


  @Get('matches/scorecard/:matchId')
  async matchScoreCard(@Param('matchId') matchId: number) {
    try {
      const match = await this.v1Service.matchScoreCard(matchId);
      return {
        status: true,
        response: { match },
      };
    } catch (error) {
      throw new NotFoundException('Match not found in our records');
    }
  }

  @Get('matches/details/:matchId')
  async matchDetail(@Param('matchId') matchId: number) {
    try {
      const match = await this.v1Service.matchDetail(matchId);
      return {
        status: true,
        response: { match },
      };
    } catch (error) {
      throw new NotFoundException('Match not found in our records');
    }
  }

  @Get('matches/squads/:matchId')
  async matchSquad(@Param('matchId') matchId: number) {
    try {
      const result = await this.v1Service.matchSquad(matchId);
      return { status: true, response: result };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: false, message: error.message };
      }
      throw error; // Let NestJS handle other unexpected errors
    }
  }

  @Get('matches/live/:matchId')
  async getLiveMatch(@Param('matchId') matchId: number): Promise<any> {
    try {
      const response = await this.v1Service.getLiveMatch(matchId);
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: false, response: error.message };
      }
      throw error; // Let NestJS handle other unexpected errors
    }
  }

  @Get('matches/fantasypoint/:matchId')
  async getMatchFantasyPoint(@Param('matchId') matchId: number) {
    return this.v1Service.getMatchFantasyPoint(matchId);
  }

  @Get('matches/competitions/squads/:competitionId/:matchId')
  async getMatchSquadFantasy(
    @Param('competitionId') competitionId: number,
    @Param('matchId') matchId: number,
  ) {
    return this.v1Service.getMatchSquadFantasy(competitionId, matchId);
  }

  @Get('matches/innings/commentary/:matchId/:inningNumber')
  async getMatchInningsCommentary(
    @Param('matchId') matchId: number,
    @Param('inningNumber') inningNumber: number,
  ) {
    return this.v1Service.getMatchInningsCommentary(matchId, inningNumber);
  }

  @Get('matches/statistics/:match_id')
  async matchStatistics(@Param('match_id') matchId: number) {
    return this.v1Service.getMatchStatistics(matchId);
  }

  @Get('teams')
  async findAll(): Promise<{ status: boolean; response: { teams: Team[] } }> {
    const teams = await this.v1Service.findAll();
    return { status: true, response: { teams } };
  }

  // can be issue
  @Get('teams/matches/:teamId')
  async getTeamMatches(@Param('teamId') teamId: number) {
    return this.v1Service.getTeamMatches(teamId);
  }

  @Get('players')
  async getAllPlayers() {
    return this.v1Service.getAllPlayers();
  }

  @Get('players/statistic/:playerId')
  async getPlayerStatistic(@Param('playerId') playerId: string) {
    const playerStatistic = await this.v1Service.getPlayerStatistic(parseInt(playerId, 10));
    return playerStatistic;
  }

  @Get('players/profile/:playerId')
  async getPlayerProfile(@Param('playerId') playerId: string) {
    const playerProfile = await this.v1Service.getPlayerProfile(parseInt(playerId, 10));
    return playerProfile;
  }

  @Get('iccranking')
  async getIccRankings() {
    const iccRankings = await this.v1Service.getIccRankings();
    return iccRankings;
  }
}
