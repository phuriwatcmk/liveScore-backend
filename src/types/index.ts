export interface League {
  id: number;
  name: string;
  logo: string;
}

export interface Country {
  name: string;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface FixtureStatus {
  short: string;
  long: string;
}

export interface Fixture {
  id: number;
  date: string;
  status: FixtureStatus;
}

export interface Teams {
  home: Team;
  away: Team;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface MatchFixture {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals?: Goals;
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
}

export interface Statistic {
  team: {
    name: string;
    logo: string;
  };
  statistic: string;
  value: number | string;
}

export interface Event {
  time: number;
  team: {
    name: string;
    logo: string;
  };
  type: string;
  detail?: string;
  player: string;
  assist?: string;
}

export interface Injury {
  team: {
    name: string;
    logo: string;
  };
  player: string;
  reason: string;
  date: string;
}

export interface Odds {
  home: string;
  draw: string;
  away: string;
}

export interface TopScorer {
  name: string;
  team: {
    name: string;
    logo: string;
  };
  goals: number;
}

export interface Player {
  name: string;
  position: string;
  number: number;
}

export interface Lineup {
  team: {
    name: string;
    logo: string;
  };
  formation: string;
  coach: string;
  startXI: Player[];
}

export interface MatchStats {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  statistics: Statistic[];
  events: Event[];
  injuries: Injury[];
  odds: Odds;
  topScorers: TopScorer[];
  lineups: Lineup;
}

export interface LastMatch {
  date: string;
  opponent: string;
  result: string;
  score: string;
}

export interface NextMatch {
  fixture: { id: number };
  date: string;
  opponent: string;
  opponentLogo: string;
  home: boolean;
}

export interface TeamFixtureStats {
  id: number;
  name: string;
  logo: string;
  nextMatch: NextMatch;
  last5: LastMatch[];
}

export interface LeagueTeamStats {
  league: League;
  country: Country;
  team: TeamFixtureStats[];
}

export interface H2HFixture {
  fixture_id: number;
  date: string;
  venue: string;
  home: string;
  away: string;
  score: string;
  events: Array<{
    minute: number;
    type: string;
    team: string;
    player: string;
  }>;
}

export interface H2HMatch {
  league: League;
  teams: Teams;
  fixtures: H2HFixture[];
}

export interface News {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  source: string;
  tags: string[];
  views: number;
  readTime: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}
