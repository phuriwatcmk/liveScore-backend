import { Hono } from 'hono';
import type { News } from '../types/index.js';

const newsRoutes = new Hono();

const mockNews: News[] = [
  {
    id: 1,
    title: 'Manchester United Sign New Midfielder',
    description: 'The Red Devils have completed the signing of a promising young midfielder from Serie A.',
    content: 'Manchester United have officially announced the signing of their new midfielder in a deal worth €40 million. The 23-year-old player has signed a five-year contract with the club and is expected to make his debut in the upcoming Premier League match.',
    image: 'https://example.com/images/man-utd-signing.jpg',
    publishedAt: '2024-08-15T10:30:00Z',
    source: 'ESPN'
  },
  {
    id: 2,
    title: 'Premier League Season Preview: Title Race Predictions',
    description: 'Expert analysis on who will win the Premier League this season.',
    content: 'As the new Premier League season approaches, experts are divided on who will claim the title. Manchester City remain favorites, but Arsenal and Liverpool are expected to mount serious challenges. The transfer window activity has shifted the balance of power in English football.',
    image: 'https://example.com/images/premier-league-preview.jpg',
    publishedAt: '2024-08-14T15:45:00Z',
    source: 'BBC Sport'
  },
  {
    id: 3,
    title: 'Champions League Draw Results Announced',
    description: 'The group stage draw has been completed with some exciting matchups ahead.',
    content: 'The UEFA Champions League group stage draw has produced some mouth-watering fixtures. Liverpool have been drawn in a tough group alongside PSG and AC Milan, while Manchester City face a relatively easier path to the knockout stages.',
    image: 'https://example.com/images/ucl-draw.jpg',
    publishedAt: '2024-08-13T18:00:00Z',
    source: 'UEFA.com'
  },
  {
    id: 4,
    title: 'Injury Update: Star Player to Miss Opening Fixtures',
    description: 'Key player ruled out for several weeks due to injury sustained in training.',
    content: 'Arsenal\'s star striker has been ruled out for the opening fixtures of the Premier League season after suffering an injury during training. The club\'s medical team expects the player to return to action within 4-6 weeks.',
    image: 'https://example.com/images/injury-news.jpg',
    publishedAt: '2024-08-12T09:15:00Z',
    source: 'Sky Sports'
  },
  {
    id: 5,
    title: 'Transfer Roundup: Latest Summer Signings',
    description: 'A comprehensive look at all the major transfers completed this summer.',
    content: 'The summer transfer window has been one of the most active in recent years. From high-profile moves to surprise signings, clubs across Europe have been busy strengthening their squads for the upcoming season.',
    image: 'https://example.com/images/transfer-roundup.jpg',
    publishedAt: '2024-08-11T14:20:00Z',
    source: 'The Athletic'
  }
];

newsRoutes.get('/', (c) => {
  const limit = parseInt(c.req.query('limit') || '10');
  const category = c.req.query('category');
  const source = c.req.query('source');

  let filteredNews = mockNews;

  if (source) {
    filteredNews = filteredNews.filter(news => 
      news.source.toLowerCase().includes(source.toLowerCase())
    );
  }

  filteredNews = filteredNews
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return c.json({
    success: true,
    data: filteredNews,
    total: filteredNews.length
  });
});

newsRoutes.get('/:id', (c) => {
  const newsId = parseInt(c.req.param('id'));
  
  if (isNaN(newsId)) {
    return c.json({ error: 'Invalid news ID' }, 400);
  }

  const news = mockNews.find(n => n.id === newsId);
  
  if (!news) {
    return c.json({ error: 'News article not found' }, 404);
  }

  return c.json({
    success: true,
    data: news
  });
});

newsRoutes.get('/latest', (c) => {
  const limit = parseInt(c.req.query('limit') || '5');
  
  const latestNews = mockNews
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return c.json({
    success: true,
    data: latestNews
  });
});

export default newsRoutes;