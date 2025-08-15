# LiveScore Backend API

A modern football/soccer live score backend API built with [Hono](https://hono.dev/) and deployed on Vercel.

## Features

- **Match Info**: Get detailed match information
- **Head-to-Head**: Historical matchup data between teams
- **Team Statistics**: Comprehensive team performance stats
- **Team Overview**: Team details with recent matches and form
- **Team Matches**: Get matches for a specific team
- **League Standings**: League table and standings
- **News**: Latest football news and updates

## API Documentation

### Swagger UI
Access the interactive API documentation at: `/docs`

### OpenAPI Specification
Get the OpenAPI JSON specification at: `/api/openapi.json`

📖 **For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## API Endpoints

### Match Info
- `GET /api/match/:id` - Get specific match details
- `GET /api/match?status=LIVE&leagueId=39` - Get matches with filters

### Head-to-Head
- `GET /api/h2h/:homeTeamId/:awayTeamId?limit=10` - Get H2H record between teams

### Team
- `GET /api/team/:id/stats` - Get team statistics
- `GET /api/team/:id/overview` - Get team overview with recent matches
- `GET /api/team/:id/matches?status=FT&limit=20` - Get team matches
- `GET /api/league/:id/standings` - Get league standings

### News
- `GET /api/news?limit=10&source=ESPN` - Get latest news
- `GET /api/news/:id` - Get specific news article
- `GET /api/news/latest?limit=5` - Get latest news headlines

## Development

### Installation

\`\`\`bash
npm install
\`\`\`

### Running locally

\`\`\`bash
npm run dev
\`\`\`

The server will start on `http://localhost:3000`

### Building

\`\`\`bash
npm run build
\`\`\`

### Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy to Vercel:
\`\`\`bash
vercel
\`\`\`

3. Follow the prompts to configure your deployment

### Environment Variables

No environment variables are required for the basic setup. The API uses mock data for demonstration purposes.

## Project Structure

\`\`\`
src/
├── index.ts          # Main application entry point
├── types/
│   └── index.ts      # TypeScript type definitions
├── routes/
│   ├── match.ts      # Match-related endpoints
│   ├── h2h.ts        # Head-to-head endpoints
│   ├── team.ts       # Team and standings endpoints
│   └── news.ts       # News endpoints
└── mock-data.ts      # Mock data for development
\`\`\`

## Response Format

All API responses follow this format:

\`\`\`json
{
  "success": true,
  "data": { ... },
  "total": 10 // (optional, for paginated responses)
}
\`\`\`

Error responses:

\`\`\`json
{
  "error": "Error message"
}
\`\`\`

## Tech Stack

- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Deployment**: Vercel
- **CORS**: Enabled for cross-origin requests

## License

MIT License