import { Hono } from 'hono';
import type { H2HRecord, Match } from '../types/index.js';

const h2hRoutes = new Hono();

const mockH2HMatches: Match[] = [
  {
    id: 101,
    date: '2024-03-17T16:30:00Z',
    status: 'FT',
    homeTeam: {
      id: 1,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png'
    },
    awayTeam: {
      id: 2,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png'
    },
    score: {
      home: 2,
      away: 2
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  },
  {
    id: 102,
    date: '2023-12-17T17:30:00Z',
    status: 'FT',
    homeTeam: {
      id: 2,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png'
    },
    awayTeam: {
      id: 1,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png'
    },
    score: {
      home: 0,
      away: 0
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  },
  {
    id: 103,
    date: '2023-08-28T16:30:00Z',
    status: 'FT',
    homeTeam: {
      id: 1,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png'
    },
    awayTeam: {
      id: 2,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png'
    },
    score: {
      home: 2,
      away: 1
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  },
  {
    id: 104,
    date: '2023-04-02T16:30:00Z',
    status: 'FT',
    homeTeam: {
      id: 2,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png'
    },
    awayTeam: {
      id: 1,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png'
    },
    score: {
      home: 7,
      away: 0
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  },
  {
    id: 105,
    date: '2022-08-22T20:00:00Z',
    status: 'FT',
    homeTeam: {
      id: 1,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png'
    },
    awayTeam: {
      id: 2,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png'
    },
    score: {
      home: 2,
      away: 1
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  }
];

h2hRoutes.get('/:homeTeamId/:awayTeamId', (c) => {
  const homeTeamId = parseInt(c.req.param('homeTeamId'));
  const awayTeamId = parseInt(c.req.param('awayTeamId'));
  const limit = parseInt(c.req.query('limit') || '10');

  if (isNaN(homeTeamId) || isNaN(awayTeamId)) {
    return c.json({ error: 'Invalid team IDs' }, 400);
  }

  const h2hMatches = mockH2HMatches
    .filter(match => 
      (match.homeTeam.id === homeTeamId && match.awayTeam.id === awayTeamId) ||
      (match.homeTeam.id === awayTeamId && match.awayTeam.id === homeTeamId)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  h2hMatches.forEach(match => {
    if (match.score.home !== null && match.score.away !== null) {
      if (match.score.home > match.score.away) {
        if (match.homeTeam.id === homeTeamId) {
          homeWins++;
        } else {
          awayWins++;
        }
      } else if (match.score.home < match.score.away) {
        if (match.awayTeam.id === homeTeamId) {
          homeWins++;
        } else {
          awayWins++;
        }
      } else {
        draws++;
      }
    }
  });

  const h2hRecord: H2HRecord = {
    matches: h2hMatches,
    stats: {
      total: h2hMatches.length,
      homeWins,
      awayWins,
      draws
    }
  };

  return c.json({
    success: true,
    data: h2hRecord
  });
});

export default h2hRoutes;