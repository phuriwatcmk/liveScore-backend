import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { mockLeagues, mockStandingsByLeague } from "../data/mockData.js";
import { createSuccessResponse, createErrorResponse, } from "../utils/response.js";
import { leagueParamsSchema, paginationSchema } from "../validators/index.js";
const leagues = new Hono();
// GET /leagues - Get all leagues
leagues.get("/", zValidator("query", paginationSchema), (c) => {
    try {
        const { page, limit } = c.req.valid("query");
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedLeagues = mockLeagues.slice(startIndex, endIndex);
        return c.json(createSuccessResponse(paginatedLeagues, "Leagues retrieved successfully", {
            page,
            limit,
            total: mockLeagues.length,
            totalPages: Math.ceil(mockLeagues.length / limit),
        }));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve leagues"), 500);
    }
});
// GET /leagues/:leagueId - Get specific league
leagues.get("/:leagueId", zValidator("param", leagueParamsSchema), (c) => {
    try {
        const { leagueId } = c.req.valid("param");
        const league = mockLeagues.find((l) => l.league.id === leagueId);
        if (!league) {
            return c.json(createErrorResponse("NOT_FOUND", `League with ID ${leagueId} not found`), 404);
        }
        return c.json(createSuccessResponse(league, "League retrieved successfully"));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve league"), 500);
    }
});
// GET /leagues/:leagueId/standings - Get league standings
leagues.get("/:leagueId/standings", zValidator("param", leagueParamsSchema), (c) => {
    try {
        const { leagueId } = c.req.valid("param");
        const leagueStandings = mockStandingsByLeague.find((standing) => standing.league.id === leagueId);
        const standings = leagueStandings?.standings;
        if (!standings) {
            return c.json(createErrorResponse("NOT_FOUND", `Standings for league ${leagueId} not found`), 404);
        }
        return c.json(createSuccessResponse(standings, "Standings retrieved successfully"));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve standings"), 500);
    }
});
export default leagues;
