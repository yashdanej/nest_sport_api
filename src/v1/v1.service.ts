import { Injectable, NotFoundException } from '@nestjs/common';
import { Season } from './entities/seasons.entity'; // Replace with actual entity path
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Json } from './entities/json.entity';
import { Competition } from './entities/competitions.entity';
import { Round } from './entities/round.entity';
import { Matches } from './entities/matches.entity';
import { Team } from './entities/teams.entity';
import { CompetitionStanding } from './entities/competition-standing.entity';
import { MatchesTeam } from './entities/matches-teams.entity';
import { LiveMatches } from './entities/live-matches.entity';
import { Commentary } from './entities/commentary.entity';
import { MatchFantasyPoint } from './entities/match-fantasy-points.entity';
import { MatchInning } from './entities/match-innings.entity';
import { InnningStatistic } from './entities/inning-statistics.entity';
import { ScorecardFallwicket } from './entities/scorecard-fallwickets.entity';
import { Player } from './entities/players.entity';
import { IccGroup } from './entities/icc-groups.entity';
import { IccRanking } from './entities/icc-rankings.entity';

@Injectable()
export class V1Service {
    constructor(
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>,
        @InjectRepository(Json)
        private readonly jsonRepository: Repository<Json>,
        @InjectRepository(Competition)
        private readonly competitionRepository: Repository<Competition>,
        @InjectRepository(Matches)
        private readonly matchesRepository: Repository<Matches>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @InjectRepository(CompetitionStanding)
        private readonly competitionStandingRepository: Repository<CompetitionStanding>,
        @InjectRepository(MatchesTeam)
        private readonly matchesTeamRepository: Repository<MatchesTeam>,
        @InjectRepository(LiveMatches)
        private readonly liveMatchesRepository: Repository<LiveMatches>,
        @InjectRepository(Commentary)
        private readonly commentaryRepository: Repository<Commentary>,
        @InjectRepository(MatchFantasyPoint)
        private readonly matchFantasyPointRepository: Repository<MatchFantasyPoint>,
        @InjectRepository(MatchInning)
        private readonly matchInningRepository: Repository<MatchInning>,
        @InjectRepository(InnningStatistic)
        private readonly inningStatisticRepository: Repository<InnningStatistic>,
        @InjectRepository(ScorecardFallwicket)
        private readonly scorecardFallwicketRepository: Repository<ScorecardFallwicket>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
        @InjectRepository(IccGroup)
        private iccGroupRepository: Repository<IccGroup>,
        @InjectRepository(IccRanking)
        private iccRankingRepository: Repository<IccRanking>,
    ) {}
    
  async getSeasons() {
    const seasons = await this.seasonRepository.find(); // Assuming Season entity has been defined

    return {
      status: true,
      response: { seasons },
    };
  }

  async allSeason() {
    const jsons = await this.jsonRepository.find({ order: { created_at: 'DESC' } });
    const data = jsons.map(json => JSON.parse(json.json));

    return {
      status: true,
      response: { seasons: data },
    };
  }

  async getSeasonCompetitions(seasonId: number, limit: number, page: number) {
    const season = await this.seasonRepository.findOne({ where: { id:seasonId, } });

    if (!season) {
      throw new NotFoundException('Season not found in our records');
    }

    const [competitions, total] = await this.competitionRepository.findAndCount({
      where: { season_id: seasonId },
      order: { id: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const page_data = {
      current_page: page,
      last_page: Math.ceil(total / limit),
      per_page: limit,
      total,
    };

    return {
      status: true,
      response: { competitions, page_data },
    };
  }

  async getCompetitions(limit: number): Promise<{ status: boolean, response: { competitions: Competition[], page_data: any } }> {
    const [competitions, total] = await this.competitionRepository.findAndCount({
      order: { id: 'DESC' },
      take: limit,
    });

    const page_data = {
      current_page: 1, // Adjust as per your pagination logic
      last_page: Math.ceil(total / limit),
      per_page: limit,
      total,
    };

    return {
      status: true,
      response: { competitions, page_data },
    };
  }

  async competitionOverview(competitionId: number) {
    const competition = await this.competitionRepository
      .createQueryBuilder('competition')
      .where('competition.id = :id', { id: competitionId })
      .leftJoinAndSelect('competition.rounds', 'rounds')
      .orderBy('rounds.order_no', 'ASC')
      .getOne();

    if (!competition) {
      throw new NotFoundException('Competition not found in our records');
    }

    return {
      status: true,
      response: { competition },
    };
  }

  async competitionMatches(competitionId: number, page: number = 1, limit: number = 10) {
    const competition = await this.competitionRepository.findOne({where: {id: competitionId}});

    if (!competition) {
      throw new NotFoundException('Competition not found in our records');
    }

    const [matches, total] = await this.matchesRepository.findAndCount({
      where: { competition_id: competitionId.toString() },
      order: { id: 'DESC' },
      relations: ['teama', 'teamb', 'venue', 'competition'],
      take: limit,
      skip: (page - 1) * limit,
    });

    const page_data = {
      current_page: page,
      last_page: Math.ceil(total / limit),
      per_page: limit,
      total,
    };

    return {
      status: true,
      response: { matches, page_data },
    };
  }

  async competitionTeams(competitionId: number) {
    const competitionExists = await this.matchesRepository.findOne({ where: { competition_id: competitionId.toString() } });

    if (!competitionExists) {
      throw new NotFoundException('Competition not found in our records');
    }

    const matches = await this.matchesRepository
      .createQueryBuilder('matches')
      .where('matches.competition_id = :competitionId', { competitionId })
      .leftJoinAndSelect('matches.teama', 'teama')
      .leftJoinAndSelect('matches.teamb', 'teamb')
      .getMany();

    const teamIds: number[] = [];
    
    matches.forEach(match => {
      if (match.teama) teamIds.push(match.teama.id);
      if (match.teamb) teamIds.push(match.teamb.id);
    });

    const uniqueIds = Array.from(new Set(teamIds));
    console.log("uniqueIds", uniqueIds);

    const teams = await this.teamRepository.findByIds(uniqueIds); // Use findByIds to fetch teams by an array of IDs

    return {
      status: true,
      response: { teams },
    };
  }

  async competitionStandings(competitionId: number) {
    // Check if competition exists
    const competitionExists = await this.competitionStandingRepository.findOne({ where: { competition_id: competitionId } });

    if (!competitionExists) {
      throw new NotFoundException('Competition not found in our records');
    }

    try {
      // Fetch distinct rounds with their minimal order_no
      const roundsWithMinOrderNo = await this.competitionStandingRepository
        .createQueryBuilder('standing')
        .select('MIN(standing.order_no)', 'order_no')
        .addSelect('standing.round_id', 'round_id')
        .where('standing.competition_id = :competitionId', { competitionId })
        .groupBy('standing.round_id')
        .orderBy('order_no', 'ASC')
        .getRawMany();

      const data = [];
      for (const round of roundsWithMinOrderNo) {
        // Fetch standings for each round
        const standings = await this.competitionStandingRepository.find({
          where: { round_id: round.round_id },
          order: { id: 'ASC' }, // Assuming 'id' is the primary key
          select: ['team_id', 'played', 'win', 'loss', 'draw', 'nr', 'overfor', 'runfor', 'overagainst', 'runagainst', 'netrr', 'points', 'quality'],
        });

        // Build data structure for each round
        data.push({
          round: {
            id: round.round_id,
            order: round.order_no,
            // Include other round details here
          },
          standings,
        });
      }

      return {
        status: true,
        response: { standing_type: 'per_round', standings: data },
      };
    } catch (error) {
      throw new Error(`Failed to fetch competition standings: ${error.message}`);
    }
  }

  async matches(status: string = '', page: number = 1, limit: number = 10) {
    try {
      // Build the base query
      let query = this.matchesRepository
        .createQueryBuilder('matches')
        .orderBy('matches.id', 'DESC')
        .leftJoinAndSelect('matches.teama', 'teama')
        .leftJoinAndSelect('matches.teamb', 'teamb')
        .leftJoinAndSelect('matches.venue', 'venue')
        .leftJoinAndSelect('matches.competition', 'competition');

      // Apply status filter if provided
      if (status !== '') {
        query = query.where('matches.status = :status', { status });
      }

      // Paginate results
      const [matches, total] = await query
        .take(limit)
        .skip((page - 1) * limit)
        .getManyAndCount();

      const page_data = {
        current_page: page,
        last_page: Math.ceil(total / limit),
        per_page: limit,
        total,
      };

      return {
        status: true,
        response: { matches, page_data },
      };
    } catch (error) {
      throw new Error(`Failed to fetch matches: ${error.message}`);
    }
  }

  async matchScoreCard(matchId: number) {
    const match = await this.matchesRepository.findOne({
      where: { id: matchId },
      relations: ['teama', 'teamb', 'venue', 'competition', 'innings'], // Ensure you have these relations in your entity
    });

    if (!match) {
      throw new NotFoundException('Match not found in our records');
    }

    return match;
  }

  async matchDetail(matchId: number) {
    const match = await this.matchesRepository.findOne({
      where: { id: matchId },
      relations: ['teama', 'teamb', 'venue', 'competition'],
    });

    if (!match) {
      throw new NotFoundException('Match not found in our records');
    }

    return match;
  }

  async matchSquad(matchId: number) {
    const match = await this.matchesRepository.findOne({where: {id: matchId}});
    
    if (!match) {
      throw new NotFoundException('Match not found in our records');
    }

    const teamASquads = await this.matchesTeamRepository.find({
      where: { match: { id: match.id }, team: { id: match.teama.id } }, // Access the id of teama
      relations: ['player', 'team'], // Include 'player' and 'team' relations
    });

    const teamBSquads = await this.matchesTeamRepository.find({
      where: { match: { id: match.id }, team: { id: match.teamb.id } }, // Access the id of teamb
      relations: ['player', 'team'], // Include 'player' and 'team' relations
    });

    return {
      response: {
        match,
        teama: { team_id: match.teama.id, squads: teamASquads }, // Access teama id
        teamb: { team_id: match.teamb.id, squads: teamBSquads }, // Access teamb id
      },
    };
  }

  async getLiveMatch(matchId: number): Promise<any> {
    const liveMatch = await this.liveMatchesRepository.findOne({
      where: { match_id: matchId },
      relations: ['commentaries'],
      order: { id: 'DESC' }, // Adjust order as needed
    });

    if (!liveMatch) {
      throw new NotFoundException('Match not found in our records');
    }

    // Process batsman and bowlers JSON fields if they exist
    if (liveMatch.batsman_json) {
      liveMatch.batsman = JSON.parse(liveMatch.batsman_json);
      delete liveMatch.batsman_json;
    }
    if (liveMatch.bowlers_json) {
      liveMatch.bowlers = JSON.parse(liveMatch.bowlers_json);
      delete liveMatch.bowlers_json;
    }

    // Process commentaries to remove unnecessary fields based on event type
    if (liveMatch.commentaries && liveMatch.commentaries.length > 0) {
      liveMatch.commentaries.forEach(commentary => {
        if (commentary.event === 'overend') {
          delete commentary.batsman_id;
          delete commentary.bowler_id;
          delete commentary.ball;
          delete commentary.noball_dismissal;
          delete commentary.text;
          delete commentary.how_out;
          delete commentary.wicket_batsman_id;
          delete commentary.batsman_runs;
          delete commentary.batsman_balls;
          if (commentary.bats_json) {
            commentary.bats_json = JSON.parse(commentary.bats_json);
            delete commentary.bats_json;
          }
          if (commentary.bowls_json) {
            commentary.bowls_json = JSON.parse(commentary.bowls_json);
            delete commentary.bowls_json;
          }
        } else if (commentary.event !== 'wicket') {
          delete commentary.how_out;
          delete commentary.wicket_batsman_id;
          delete commentary.batsman_runs;
          delete commentary.batsman_balls;
          delete commentary.runs;
          delete commentary.bats_json;
          delete commentary.bowls_json;
        } else {
          delete commentary.runs;
          delete commentary.bats_json;
          delete commentary.bowls_json;
        }
      });
    }

    return {
      status: true,
      response: { liveMatch },
    };
  }

  async getMatchFantasyPoint(matchId: number): Promise<any> {
    const match = await this.matchesRepository.findOne({where: {id: matchId}});

    if (!match) {
      throw new NotFoundException('Match not found in our records');
    }

    const points = {
      teama: {
        playing11: await this.matchFantasyPointRepository.find({
          where: { team_id: match.teama.id, type: 'playing11' },
        }),
        substitute: await this.matchFantasyPointRepository.find({
          where: { team_id: match.teama.id, type: 'substitute' },
        }),
      },
      teamb: {
        playing11: await this.matchFantasyPointRepository.find({
          where: { team_id: match.teamb.id, type: 'playing11' },
        }),
        substitute: await this.matchFantasyPointRepository.find({
          where: { team_id: match.teamb.id, type: 'substitute' },
        }),
      },
    };

    return {
      status: true,
      response: { match: { ...match, points } },
    };
  }

  async getMatchSquadFantasy(competitionId: number, matchId: number): Promise<any> {
    const competition = await this.competitionRepository.findOne({where: {id: competitionId}});

    if (!competition) {
      throw new NotFoundException('Competition not found in our records');
    }

    const match = await this.matchesRepository.findOne({
      where: { id: matchId, competition_id: competitionId.toString() },
    });

    if (!match) {
      throw new NotFoundException('Competition not find this match id');
    }

    const teamaSquads = await this.matchesTeamRepository.find({
      where: { match_id: match.id, team_id: match.teama.id },
      relations: ['player'],
    });

    const teambSquads = await this.matchesTeamRepository.find({
      where: { match_id: match.id, team_id: match.teamb.id },
      relations: ['player'],
    });

    const squads = [
      {
        team: await this.teamRepository.findOne({where: {id: match.teama.id}}),
        players: teamaSquads,
      },
      {
        team: await this.teamRepository.findOne({where: {id: match.teama.id}}),
        players: teambSquads,
      },
    ];

    return {
      status: true,
      response: {
        squad_type: 'per_team',
        squads: squads,
      },
    };
  }

  async getMatchInningsCommentary(matchId: number, inningNumber: number): Promise<any> {
    try {
      const match = await this.matchesRepository.findOne({where: {id: matchId}});
      if (!match) {
        return { status: false, response: 'Match not found in our records' };
      }
      console.log("inningNumber", inningNumber);
      
      if (inningNumber !== 1 && inningNumber !== 2) {
        return { status: false, response: 'Invalid inning number' };
      }

      const inning = await this.matchInningRepository
        .createQueryBuilder('inning')
        .leftJoinAndSelect('inning.batsmans', 'batsmans')
        .leftJoinAndSelect('inning.bowlers', 'bowlers')
        .leftJoinAndSelect('inning.fielders', 'fielders')
        .leftJoinAndSelect('inning.did_not_bat', 'did_not_bat')
        .leftJoinAndSelect('inning.inningcommentaries', 'inningcommentaries', 'inningcommentaries.live_inning_number = :inning_number', { inningNumber })
        .where('inning.match_id = :match_id', { match_id: matchId })
        .andWhere('inning.number = :inning_number', { inningNumber })
        .orderBy('inningcommentaries.over', 'DESC')
        .addOrderBy('inningcommentaries.ball', 'ASC')
        .getOne();

      if (!inning) {
        return { status: false, response: 'Inning not found for this match' };
      }

      return { status: true, response: { inning } };
    } catch (error) {
      return { status: false, response: 'Something went wrong' };
    }
  }

  async getMatchStatistics(matchId: number) {
    try {
      const match = await this.matchesRepository.findOne({where: {id: matchId}});
      if (!match) {
        return { status: false, response: 'Match not found in our records' };
      }

      const innings = await this.inningStatisticRepository.find({
        where: { match_id: matchId },
        order: { number: 'ASC' },
      });

      for (let inning of innings) {
        inning.statistics = {
          manhattan: JSON.parse(inning.manhattan_json),
          worm: JSON.parse(inning.worm_json),
          runrates: JSON.parse(inning.runrates_json),
          partnership: JSON.parse(inning.partnership_json),
          runtypes: JSON.parse(inning.runtypes_json),
          wickets: JSON.parse(inning.wickets_json),
          p2p: JSON.parse(inning.p2p_json),
          extras: JSON.parse(inning.extras_json),
        };

        const fows = await this.scorecardFallwicketRepository.find({
          where: { inning_id: inning.inning_id },
          order: { number: 'ASC' },
        });

        inning.fows = fows;
      }

      return { status: true, response: { innings } };
    } catch (error) {
      return { status: false, response: 'Something went wrong' };
    }
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async getTeamMatches(teamId: number) {
    const team = await this.teamRepository.findOne({where: {id: teamId}});
    if (!team) {
      return { status: false, response: 'Team not found in our records' };
    }

    const matches = await this.matchesRepository
      .createQueryBuilder('matches')
      .where('matches.teama = :teamId OR matches.teamb = :teamId', { teamId })
      .orderBy('matches.id', 'DESC')
      .leftJoinAndSelect('matches.teama', 'teama')
      .leftJoinAndSelect('matches.teamb', 'teamb')
      .getMany();

    return { status: true, response: { matches } };
  }

  async getAllPlayers() {
    const players = await this.playerRepository.find();
    return { status: true, response: { players } };
  }

  async getPlayerStatistic(playerId: number): Promise<any> {
    const player = await this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.batting', 'batting')
      .leftJoinAndSelect('player.bowling', 'bowling')
      .where('player.id = :playerId', { playerId })
      .getOne();

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return {
      status: true,
      response: {
        player,
      },
    };
  }

  async getPlayerProfile(playerId: number): Promise<any> {
    const player = await this.playerRepository.findOne({where: {id: playerId}});

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return {
      status: true,
      response: {
        player,
      },
    };
  }

  async getIccRankings(): Promise<any> {
    const groups = await this.iccGroupRepository.find();
    const groupArr = {};
    const ranksFinal = {};

    for (const group of groups) {
      groupArr[group.key_name] = group.name;

      const rankings = await this.iccRankingRepository.find({ where: { group_name: group.key_name } });
      const temp = {};

      rankings.forEach(ranking => {
        temp[ranking.format] = JSON.parse(ranking.json);
      });

      ranksFinal[group.key_name] = temp;
    }

    return {
      status: true,
      response: {
        ranks: ranksFinal,
        groups: groupArr,
      },
    };
  }
}
