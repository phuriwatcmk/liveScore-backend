import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { swaggerSpec } from './swagger.js';
import matchRoutes from './routes/match.js';
import h2hRoutes from './routes/h2h.js';
import teamRoutes from './routes/team.js';
import newsRoutes from './routes/news.js';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Swagger UI
app.get('/docs', swaggerUI({ url: '/api/openapi.json' }));
app.get('/api/openapi.json', (c) => {
  return c.json(swaggerSpec);
});

app.get('/', (c) => {
  return c.json({
    message: 'LiveScore Backend API',
    version: '1.0.0',
    documentation: '/docs',
    openapi: '/api/openapi.json',
    endpoints: {
      match: '/api/match/:id',
      h2h: '/api/h2h/:homeTeamId/:awayTeamId',
      teamStats: '/api/team/:id/stats',
      teamOverview: '/api/team/:id/overview',
      teamMatches: '/api/team/:id/matches',
      standings: '/api/league/:id/standings',
      news: '/api/news'
    }
  });
});

app.route('/api/match', matchRoutes);
app.route('/api/h2h', h2hRoutes);
app.route('/api/team', teamRoutes);
app.route('/api/league', teamRoutes);
app.route('/api/news', newsRoutes);

app.get('/api/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.notFound((c) => {
  return c.json({ error: 'Route not found' }, 404);
});

app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;