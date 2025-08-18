import { Hono } from 'hono';
import type { League } from '../types/index.js';

const leagueRoutes = new Hono();

const mockLeagues: League[] = [
  {
    id: 39,
    name: 'Premier League',
    logo: 'https://media.api-sports.io/football/leagues/39.png'
  },
  {
    id: 140,
    name: 'La Liga',
    logo: 'https://media.api-sports.io/football/leagues/140.png'
  },
  {
    id: 78,
    name: 'Bundesliga',
    logo: 'https://media.api-sports.io/football/leagues/78.png'
  },
  {
    id: 135,
    name: 'Serie A',
    logo: 'https://media.api-sports.io/football/leagues/135.png'
  },
  {
    id: 61,
    name: 'Ligue 1',
    logo: 'https://media.api-sports.io/football/leagues/61.png'
  }
];

leagueRoutes.get('/:id', (c) => {
  const leagueId = parseInt(c.req.param('id'));
  
  if (isNaN(leagueId)) {
    return c.json({ error: 'Invalid league ID' }, 400);
  }

  const league = mockLeagues.find(l => l.id === leagueId);
  
  if (!league) {
    return c.json({ error: 'League not found' }, 404);
  }

  return c.json({
    success: true,
    data: league
  });
});

leagueRoutes.get('/', (c) => {
  return c.json({
    success: true,
    data: mockLeagues,
    total: mockLeagues.length
  });
});

export default leagueRoutes;