# API Documentation

## Interactive Documentation

### Swagger UI
Visit `/docs` to access the interactive Swagger UI documentation where you can:
- Browse all available endpoints
- View request/response schemas
- Test API endpoints directly from the browser
- See example requests and responses

### OpenAPI Specification
The complete OpenAPI 3.0 specification is available at `/api/openapi.json`

## Quick Examples

### Get Match Info
```bash
curl http://localhost:3000/api/match/1
```

### Get Team Statistics
```bash
curl http://localhost:3000/api/team/1/stats
```

### Get Head-to-Head Data
```bash
curl http://localhost:3000/api/h2h/1/2?limit=5
```

### Get Latest News
```bash
curl http://localhost:3000/api/news?limit=10
```

### Get League Standings
```bash
curl http://localhost:3000/api/league/39/standings
```

## Response Format

All successful API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "total": 10  // optional, for paginated responses
}
```

Error responses:
```json
{
  "error": "Error message description"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## Available Filters

### Match Endpoints
- `status`: Filter by match status (`FT`, `LIVE`, `SCH`)
- `leagueId`: Filter by league ID

### Team Match Endpoints
- `status`: Filter by match status
- `limit`: Limit number of results (default: 20)

### H2H Endpoints
- `limit`: Limit number of matches (default: 10)

### News Endpoints
- `limit`: Limit number of articles (default: 10)
- `source`: Filter by news source

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## Rate Limiting

No rate limiting is currently implemented.

## CORS

CORS is enabled for:
- `http://localhost:3000`
- `https://your-frontend-domain.vercel.app`

## Development

To explore the API:
1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/docs` for interactive documentation
3. Use the Swagger UI to test endpoints directly