export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "LiveScore Backend API",
    version: "1.0.0",
    description:
      "A comprehensive football/soccer live score API built with Hono",
    contact: {
      name: "API Support",
      email: "support@livescore.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://live-score-backend.vercel.app",
      description: "Production server",
    },
  ],
  paths: {
    "/": {
      get: {
        summary: "Get API information",
        description:
          "Returns basic information about the API and available endpoints",
        responses: {
          "200": {
            description: "API information",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "LiveScore Backend API",
                    },
                    version: { type: "string", example: "1.0.0" },
                    endpoints: {
                      type: "object",
                      properties: {
                        match: { type: "string", example: "/api/match/:id" },
                        h2h: {
                          type: "string",
                          example: "/api/h2h/fixture/:fixture_id",
                        },
                        teamStats: {
                          type: "string",
                          example: "/api/team/:id/stats",
                        },
                        teamOverview: {
                          type: "string",
                          example: "/api/team/:id/overview",
                        },
                        teamMatches: {
                          type: "string",
                          example: "/api/team/:id/matches",
                        },
                        standings: {
                          type: "string",
                          example: "/api/league/:id/standings",
                        },
                        leagues: { type: "string", example: "/api/league" },
                        league: { type: "string", example: "/api/league/:id" },
                        news: { type: "string", example: "/api/news" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/health": {
      get: {
        summary: "Health check",
        description: "Returns the health status of the API",
        responses: {
          "200": {
            description: "API is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "OK" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/match": {
      get: {
        summary: "Get all matches",
        description: "Retrieve a list of all matches with optional filtering",
        parameters: [
          {
            name: "status",
            in: "query",
            description: "Filter matches by status",
            required: false,
            schema: {
              type: "string",
              enum: ["FT", "LIVE", "SCH"],
            },
          },
          {
            name: "leagueId",
            in: "query",
            description: "Filter matches by league ID",
            required: false,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of matches",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MatchListResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/match/{id}": {
      get: {
        summary: "Get match by ID",
        description: "Retrieve detailed information about a specific match",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Match ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Match details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MatchResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid match ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "Match not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/h2h/fixture/{fixture_id}": {
      get: {
        summary: "Get match data by fixture ID",
        description: "Retrieve detailed match information using fixture ID",
        parameters: [
          {
            name: "fixture_id",
            in: "path",
            required: true,
            description: "Fixture ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Match data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MatchResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid fixture ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "Match not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/team/{id}/stats": {
      get: {
        summary: "Get team statistics",
        description: "Retrieve comprehensive statistics for a team",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Team ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Team statistics",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TeamStatsResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid team ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "Team statistics not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/team/{id}/overview": {
      get: {
        summary: "Get team overview",
        description: "Retrieve team overview with recent matches and form",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Team ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Team overview",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TeamOverviewResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid team ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "Team not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/team/{id}/matches": {
      get: {
        summary: "Get team matches",
        description: "Retrieve matches for a specific team",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Team ID",
            schema: {
              type: "integer",
            },
          },
          {
            name: "status",
            in: "query",
            description: "Filter matches by status",
            required: false,
            schema: {
              type: "string",
              enum: ["FT", "LIVE", "SCH"],
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit number of matches returned",
            required: false,
            schema: {
              type: "integer",
              default: 20,
            },
          },
        ],
        responses: {
          "200": {
            description: "Team matches",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MatchListResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid team ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/league": {
      get: {
        summary: "Get all leagues",
        description: "Retrieve a list of all available leagues",
        responses: {
          "200": {
            description: "List of leagues",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LeagueListResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/league/{id}": {
      get: {
        summary: "Get league by ID",
        description: "Retrieve detailed information about a specific league",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "League ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "League details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LeagueResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid league ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "League not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/league/{id}/standings": {
      get: {
        summary: "Get league standings",
        description: "Retrieve league table and standings",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "League ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "League standings",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/StandingsResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid league ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/news": {
      get: {
        summary: "Get news list",
        description: "Retrieve latest football news",
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "Limit number of news articles returned",
            required: false,
            schema: {
              type: "integer",
              default: 10,
            },
          },
          {
            name: "source",
            in: "query",
            description: "Filter news by source",
            required: false,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "List of news articles",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewsListResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/news/{id}": {
      get: {
        summary: "Get news article by ID",
        description: "Retrieve a specific news article",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "News article ID",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "News article details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewsResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid news ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "News article not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/news/latest": {
      get: {
        summary: "Get latest news",
        description: "Retrieve the latest news headlines",
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "Limit number of news articles returned",
            required: false,
            schema: {
              type: "integer",
              default: 5,
            },
          },
        ],
        responses: {
          "200": {
            description: "Latest news articles",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewsListResponse",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Error message",
          },
        },
      },
      Team: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Manchester United" },
          logo: {
            type: "string",
            example: "https://media.api-sports.io/football/teams/33.png",
          },
        },
      },
      League: {
        type: "object",
        properties: {
          id: { type: "integer", example: 39 },
          name: { type: "string", example: "Premier League" },
          logo: {
            type: "string",
            example: "https://media.api-sports.io/football/leagues/39.png",
          },
        },
      },
      Score: {
        type: "object",
        properties: {
          home: { type: "integer", nullable: true, example: 2 },
          away: { type: "integer", nullable: true, example: 1 },
        },
      },
      Match: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          fixture_id: { type: "integer", example: 1001 },
          date: {
            type: "string",
            format: "date-time",
            example: "2024-08-15T15:00:00Z",
          },
          status: {
            type: "string",
            enum: ["FT", "LIVE", "SCH"],
            example: "FT",
          },
          homeTeam: { $ref: "#/components/schemas/Team" },
          awayTeam: { $ref: "#/components/schemas/Team" },
          score: { $ref: "#/components/schemas/Score" },
          league: { $ref: "#/components/schemas/League" },
        },
      },
      MatchResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: { $ref: "#/components/schemas/Match" },
        },
      },
      MatchListResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/Match" },
          },
          total: { type: "integer", example: 10 },
        },
      },
      H2HStats: {
        type: "object",
        properties: {
          total: { type: "integer", example: 10 },
          homeWins: { type: "integer", example: 4 },
          awayWins: { type: "integer", example: 3 },
          draws: { type: "integer", example: 3 },
        },
      },
      H2HResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              matches: {
                type: "array",
                items: { $ref: "#/components/schemas/Match" },
              },
              stats: { $ref: "#/components/schemas/H2HStats" },
            },
          },
        },
      },
      TeamStats: {
        type: "object",
        properties: {
          played: { type: "integer", example: 38 },
          wins: { type: "integer", example: 22 },
          draws: { type: "integer", example: 8 },
          losses: { type: "integer", example: 8 },
          goalsFor: { type: "integer", example: 65 },
          goalsAgainst: { type: "integer", example: 45 },
          points: { type: "integer", example: 74 },
        },
      },
      TeamStatsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              team: { $ref: "#/components/schemas/Team" },
              league: { $ref: "#/components/schemas/League" },
              stats: { $ref: "#/components/schemas/TeamStats" },
            },
          },
        },
      },
      TeamOverviewResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              team: { $ref: "#/components/schemas/Team" },
              stats: { $ref: "#/components/schemas/TeamStats" },
              recentMatches: {
                type: "array",
                items: { $ref: "#/components/schemas/Match" },
              },
              form: {
                type: "array",
                items: { type: "string", enum: ["W", "L", "D"] },
                example: ["W", "W", "L", "D", "W"],
              },
            },
          },
        },
      },
      Standing: {
        type: "object",
        properties: {
          position: { type: "integer", example: 1 },
          team: { $ref: "#/components/schemas/Team" },
          played: { type: "integer", example: 38 },
          wins: { type: "integer", example: 26 },
          draws: { type: "integer", example: 6 },
          losses: { type: "integer", example: 6 },
          goalsFor: { type: "integer", example: 91 },
          goalsAgainst: { type: "integer", example: 29 },
          goalDifference: { type: "integer", example: 62 },
          points: { type: "integer", example: 84 },
        },
      },
      StandingsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              league: { $ref: "#/components/schemas/League" },
              standings: {
                type: "array",
                items: { $ref: "#/components/schemas/Standing" },
              },
            },
          },
        },
      },
      News: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: {
            type: "string",
            example: "Manchester United Sign New Midfielder",
          },
          description: {
            type: "string",
            example: "The Red Devils have completed the signing...",
          },
          content: {
            type: "string",
            example: "Manchester United have officially announced...",
          },
          image: {
            type: "string",
            example: "https://example.com/images/news.jpg",
          },
          publishedAt: {
            type: "string",
            format: "date-time",
            example: "2024-08-15T10:30:00Z",
          },
          source: { type: "string", example: "ESPN" },
        },
      },
      NewsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: { $ref: "#/components/schemas/News" },
        },
      },
      NewsListResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/News" },
          },
          total: { type: "integer", example: 5 },
        },
      },
      LeagueResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: { $ref: "#/components/schemas/League" },
        },
      },
      LeagueListResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/League" },
          },
          total: { type: "integer", example: 5 },
        },
      },
    },
  },
};
