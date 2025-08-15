import { Hono } from "hono";
import { mockLeagues, mockStandingsByLeague } from "../data/mockData";
import { createSuccessResponse, createErrorResponse, } from "../utils/response";
const leagues = new Hono();
// GET /leagues - Get all leagues
leagues.get("/", (c) => {
    try {
        const query = c.req.query();
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
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
leagues.get("/:leagueId", (c) => {
    try {
        const leagueId = parseInt(c.req.param("leagueId"), 10);
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
leagues.get("/:leagueId/standings", (c) => {
    try {
        const leagueId = parseInt(c.req.param("leagueId"), 10);
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
