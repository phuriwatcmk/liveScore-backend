import { Hono } from 'hono';
import type { Match } from '../types/index.js';

const matchRoutes = new Hono();

const mockMatches: Match[] = [
  {
    id: 1,
    date: '2024-08-15T15:00:00Z',
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
    id: 2,
    date: '2024-08-15T17:30:00Z',
    status: 'LIVE',
    homeTeam: {
      id: 3,
      name: 'Arsenal',
      logo: 'https://media.api-sports.io/football/teams/42.png'
    },
    awayTeam: {
      id: 4,
      name: 'Chelsea',
      logo: 'https://media.api-sports.io/football/teams/49.png'
    },
    score: {
      home: 1,
      away: 0
    },
    league: {
      id: 39,
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png'
    }
  }
];

matchRoutes.get('/:id', (c) => {
  const matchId = parseInt(c.req.param('id'));
  
  if (isNaN(matchId)) {
    return c.json({ error: 'Invalid match ID' }, 400);
  }

  const match = mockMatches.find(m => m.id === matchId);
  
  if (!match) {
    return c.json({ error: 'Match not found' }, 404);
  }

  return c.json({
    success: true,
    data: match
  });
});

matchRoutes.get('/', (c) => {
  const status = c.req.query('status');
  const leagueId = c.req.query('leagueId');
  
  let filteredMatches = mockMatches;
  
  if (status) {
    filteredMatches = filteredMatches.filter(m => m.status === status);
  }
  
  if (leagueId) {
    const leagueIdNum = parseInt(leagueId);
    if (!isNaN(leagueIdNum)) {
      filteredMatches = filteredMatches.filter(m => m.league.id === leagueIdNum);
    }
  }

  return c.json({
    success: true,
    data: filteredMatches,
    total: filteredMatches.length
  });
});

export default matchRoutes;