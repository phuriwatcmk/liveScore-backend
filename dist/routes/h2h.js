import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { mockH2HWithFixtures } from "../data/mockData.js";
import { createSuccessResponse, createErrorResponse, paginate, } from "../utils/response.js";
import { h2hParamsSchema, paginationSchema } from "../validators/index.js";
const h2h = new Hono();
// GET /h2h/:team1Id/:team2Id - Get head-to-head records between two teams
h2h.get("/:team1Id/:team2Id", zValidator("param", h2hParamsSchema), zValidator("query", paginationSchema), (c) => {
    try {
        const { team1Id, team2Id } = c.req.valid("param");
        const { page, limit } = c.req.valid("query");
        // Find H2H records between the two teams
        const h2hRecords = mockH2HWithFixtures.filter((record) => {
            const homeId = record.teams.home.id;
            const awayId = record.teams.away.id;
            return ((homeId === team1Id && awayId === team2Id) ||
                (homeId === team2Id && awayId === team1Id));
        });
        if (h2hRecords.length === 0) {
            return c.json(createErrorResponse("NOT_FOUND", `No head-to-head records found between teams ${team1Id} and ${team2Id}`), 404);
        }
        // Calculate statistics
        let team1Wins = 0;
        let team2Wins = 0;
        let draws = 0;
        let totalGoalsTeam1 = 0;
        let totalGoalsTeam2 = 0;
        h2hRecords.forEach((record) => {
            record.fixtures.forEach((fixture) => {
                const [homeGoals, awayGoals] = fixture.score.split("-").map(Number);
                if (record.teams.home.id === team1Id) {
                    totalGoalsTeam1 += homeGoals;
                    totalGoalsTeam2 += awayGoals;
                    if (homeGoals > awayGoals)
                        team1Wins++;
                    else if (homeGoals < awayGoals)
                        team2Wins++;
                    else
                        draws++;
                }
                else {
                    totalGoalsTeam1 += awayGoals;
                    totalGoalsTeam2 += homeGoals;
                    if (awayGoals > homeGoals)
                        team1Wins++;
                    else if (awayGoals < homeGoals)
                        team2Wins++;
                    else
                        draws++;
                }
            });
        });
        const totalMatches = h2hRecords.reduce((sum, record) => sum + record.fixtures.length, 0);
        const { data, pagination } = paginate(h2hRecords, page, limit);
        const response = {
            matches: data,
            statistics: {
                totalMatches,
                team1: {
                    id: team1Id,
                    wins: team1Wins,
                    winPercentage: totalMatches > 0 ? (team1Wins / totalMatches) * 100 : 0,
                    totalGoals: totalGoalsTeam1,
                    averageGoals: totalMatches > 0 ? totalGoalsTeam1 / totalMatches : 0,
                },
                team2: {
                    id: team2Id,
                    wins: team2Wins,
                    winPercentage: totalMatches > 0 ? (team2Wins / totalMatches) * 100 : 0,
                    totalGoals: totalGoalsTeam2,
                    averageGoals: totalMatches > 0 ? totalGoalsTeam2 / totalMatches : 0,
                },
                draws,
                drawPercentage: totalMatches > 0 ? (draws / totalMatches) * 100 : 0,
            },
        };
        return c.json(createSuccessResponse(response, "Head-to-head records retrieved successfully", pagination));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve head-to-head records"), 500);
    }
});
// GET /h2h/:team1Id/:team2Id/recent - Get recent matches between two teams
h2h.get("/:team1Id/:team2Id/recent", zValidator("param", h2hParamsSchema), (c) => {
    try {
        const { team1Id, team2Id } = c.req.valid("param");
        // Find recent H2H records (limit to 5 most recent)
        const h2hRecords = mockH2HWithFixtures.filter((record) => {
            const homeId = record.teams.home.id;
            const awayId = record.teams.away.id;
            return ((homeId === team1Id && awayId === team2Id) ||
                (homeId === team2Id && awayId === team1Id));
        });
        if (h2hRecords.length === 0) {
            return c.json(createErrorResponse("NOT_FOUND", `No recent matches found between teams ${team1Id} and ${team2Id}`), 404);
        }
        // Get all fixtures and sort by date (most recent first)
        const allFixtures = h2hRecords
            .flatMap((record) => record.fixtures.map((fixture) => ({
            ...fixture,
            league: record.league,
            teams: record.teams,
        })))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5); // Get only 5 most recent
        return c.json(createSuccessResponse(allFixtures, "Recent head-to-head matches retrieved successfully"));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve recent head-to-head matches"), 500);
    }
});
export default h2h;
