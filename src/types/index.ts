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

export interface Match {
  id: number;
  date: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    home: number | null;
    away: number | null;
  };
  league: League;
}

export interface H2HRecord {
  matches: Match[];
  stats: {
    total: number;
    homeWins: number;
    awayWins: number;
    draws: number;
  };
}

export interface TeamStatistics {
  team: Team;
  league: League;
  stats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface News {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  publishedAt: string;
  source: string;
}