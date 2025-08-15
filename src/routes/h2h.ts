import { Hono } from 'hono';
import type { Match } from '../types/index.js';

const h2hRoutes = new Hono();

const mockH2HMatches: Match[] = [
  {
    id: 101,
    fixture_id: 1001,
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
    fixture_id: 1002,
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
    fixture_id: 1003,
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
    fixture_id: 1004,
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
    fixture_id: 1005,
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

h2hRoutes.get('/fixture/:fixture_id', (c) => {
  const fixtureId = parseInt(c.req.param('fixture_id'));

  if (isNaN(fixtureId)) {
    return c.json({ error: 'Invalid fixture ID' }, 400);
  }

  const match = mockH2HMatches.find(m => m.fixture_id === fixtureId);

  if (!match) {
    return c.json({ error: 'Match not found' }, 404);
  }

  return c.json({
    success: true,
    data: match
  });
});

export default h2hRoutes;