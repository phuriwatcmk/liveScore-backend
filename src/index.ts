import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import { Scalar } from "@scalar/hono-api-reference";

import { corsMiddleware } from "./middleware/cors";
import { createSuccessResponse, createErrorResponse } from "./utils/response";

// Import routes
import leagues from "./routes/leagues";
import fixtures from "./routes/fixtures";
import teams from "./routes/teams";
import h2h from "./routes/h2h";
import news from "./routes/news";

const app = new Hono();

// Global middleware
app.use("*", logger());
app.use("*", corsMiddleware);
app.use("*", prettyJSON());

// Health check endpoint
app.get("/", (c) => {
  return c.json(
    createSuccessResponse(
      {
        message: "Live Score API is running!",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        endpoints: {
          leagues: "/api/v1/leagues",
          fixtures: "/api/v1/fixtures",
          teams: "/api/v1/teams",
          h2h: "/api/v1/h2h",
          news: "/api/v1/news",
          docs: "/docs",
        },
      },
      "API is healthy"
    )
  );
});

// API routes
app.route("/api/v1/leagues", leagues);
app.route("/api/v1/fixtures", fixtures);
app.route("/api/v1/teams", teams);
app.route("/api/v1/h2h", h2h);
app.route("/api/v1/news", news);

// API Documentation
app.get("/docs", Scalar({ 
  url: "/doc",
  theme: "purple"
}));

// OpenAPI spec endpoint
app.get("/openapi.json", (c) => {
  return c.json({
    openapi: "3.0.0",
    info: {
      title: "Live Score API",
      version: "1.0.0",
      description: "A comprehensive API for live sports scores and fixtures",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    paths: {
      "/": {
        get: {
          summary: "Health check",
          description: "Check if the API is running",
          responses: {
            "200": {
              description: "API is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        properties: {
                          message: { type: "string" },
                          version: { type: "string" },
                          timestamp: { type: "string" },
                          endpoints: { type: "object" },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/leagues": {
        get: {
          summary: "Get all leagues",
          description: "Retrieve a list of all available leagues",
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            code: { type: "string" },
                            country: { type: "string" },
                            logo: { type: "string" },
                            seasons: { type: "array" },
                          },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/fixtures": {
        get: {
          summary: "Get fixtures",
          description: "Retrieve fixtures with optional filters",
          parameters: [
            {
              name: "date",
              in: "query",
              description: "Filter by date (YYYY-MM-DD)",
              schema: { type: "string" },
            },
            {
              name: "league",
              in: "query",
              description: "Filter by league ID",
              schema: { type: "number" },
            },
            {
              name: "team",
              in: "query",
              description: "Filter by team ID",
              schema: { type: "number" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            date: { type: "string" },
                            time: { type: "string" },
                            status: { type: "string" },
                            homeTeam: { type: "object" },
                            awayTeam: { type: "object" },
                            score: { type: "object" },
                            league: { type: "object" },
                          },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/teams": {
        get: {
          summary: "Get teams",
          description: "Retrieve teams with optional filters",
          parameters: [
            {
              name: "league",
              in: "query",
              description: "Filter by league ID",
              schema: { type: "number" },
            },
            {
              name: "country",
              in: "query",
              description: "Filter by country",
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            code: { type: "string" },
                            country: { type: "string" },
                            logo: { type: "string" },
                            founded: { type: "number" },
                            venue: { type: "object" },
                          },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/h2h": {
        get: {
          summary: "Get head-to-head statistics",
          description: "Retrieve head-to-head statistics between two teams",
          parameters: [
            {
              name: "team1",
              in: "query",
              required: true,
              description: "First team ID",
              schema: { type: "number" },
            },
            {
              name: "team2",
              in: "query",
              required: true,
              description: "Second team ID",
              schema: { type: "number" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "object",
                        properties: {
                          teams: { type: "object" },
                          matches: { type: "array" },
                          statistics: { type: "object" },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/news": {
        get: {
          summary: "Get sports news",
          description: "Retrieve latest sports news",
          parameters: [
            {
              name: "category",
              in: "query",
              description: "Filter by news category",
              schema: { type: "string" },
            },
            {
              name: "team",
              in: "query",
              description: "Filter by team ID",
              schema: { type: "number" },
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            title: { type: "string" },
                            summary: { type: "string" },
                            content: { type: "string" },
                            author: { type: "string" },
                            publishedAt: { type: "string" },
                            source: { type: "string" },
                            category: { type: "string" },
                            tags: { type: "array" },
                            image: { type: "string" },
                          },
                        },
                      },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
});

// 404 handler
app.notFound((c) => {
  return c.json(
    createErrorResponse("NOT_FOUND", "The requested endpoint was not found"),
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json(
    createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
    500
  );
});

const port = parseInt(process.env.PORT || "3001");

console.log(`🚀 Live Score API Server is running on port ${port}`);
console.log(`📖 API Documentation: http://localhost:${port}/docs`);
console.log(`🏥 Health Check: http://localhost:${port}/`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
