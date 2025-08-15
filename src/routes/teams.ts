import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  mockTeamFixturesStats,
  mockStandingsByLeague,
  mockFixturesToday,
} from "../data/mockData";
import {
  createSuccessResponse,
  createErrorResponse,
  paginate,
} from "../utils/response";
import { teamParamsSchema, paginationSchema } from "../validators/index";

const teams = new Hono();

// GET /teams/:teamId - Get team overview
teams.get("/:teamId", zValidator("param", teamParamsSchema), (c) => {
  try {
    const { teamId } = c.req.valid("param");

    // Find team in fixture stats
    let teamData = null;
    for (const leagueStats of mockTeamFixturesStats) {
      const team = leagueStats.team.find((t) => t.id === teamId);
      if (team) {
        teamData = {
          ...team,
          league: leagueStats.league,
          country: leagueStats.country,
        };
        break;
      }
    }

    if (!teamData) {
      return c.json(
        createErrorResponse("NOT_FOUND", `Team with ID ${teamId} not found`),
        404
      );
    }

    return c.json(
      createSuccessResponse(teamData, "Team overview retrieved successfully")
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve team overview"),
      500
    );
  }
});

// GET /teams/:teamId/matches - Get team matches
teams.get(
  "/:teamId/matches",
  zValidator("param", teamParamsSchema),
  zValidator("query", paginationSchema),
  (c) => {
    try {
      const { teamId } = c.req.valid("param");
      const { page, limit } = c.req.valid("query");

      // Find matches where team is playing
      const teamMatches = mockFixturesToday.filter(
        (fixture) =>
          fixture.teams.home.id === teamId || fixture.teams.away.id === teamId
      );

      if (teamMatches.length === 0) {
        return c.json(
          createErrorResponse(
            "NOT_FOUND",
            `No matches found for team ${teamId}`
          ),
          404
        );
      }

      const { data, pagination } = paginate(teamMatches, page, limit);

      return c.json(
        createSuccessResponse(
          data,
          "Team matches retrieved successfully",
          pagination
        )
      );
    } catch (error) {
      return c.json(
        createErrorResponse(
          "INTERNAL_ERROR",
          "Failed to retrieve team matches"
        ),
        500
      );
    }
  }
);

// GET /teams/:teamId/standings - Get team standings in their league
teams.get("/:teamId/standings", zValidator("param", teamParamsSchema), (c) => {
  try {
    const { teamId } = c.req.valid("param");

    // Find team's league first
    let teamLeagueId = null;
    for (const leagueStats of mockTeamFixturesStats) {
      const team = leagueStats.team.find((t) => t.id === teamId);
      if (team) {
        teamLeagueId = leagueStats.league.id;
        break;
      }
    }

    if (!teamLeagueId) {
      return c.json(
        createErrorResponse("NOT_FOUND", `Team with ID ${teamId} not found`),
        404
      );
    }

    const leagueStandings = mockStandingsByLeague.find(
      (standing) => standing.league.id === teamLeagueId
    );
    const standings = leagueStandings?.standings;

    if (!standings) {
      return c.json(
        createErrorResponse(
          "NOT_FOUND",
          `Standings not found for team's league`
        ),
        404
      );
    }

    // Find team's position in standings
    const teamStanding = standings.find((s) => s.team.id === teamId);

    return c.json(
      createSuccessResponse(
        {
          standings,
          teamPosition: teamStanding,
          leagueId: teamLeagueId,
        },
        "Team standings retrieved successfully"
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to retrieve team standings"
      ),
      500
    );
  }
});

// GET /teams/:teamId/statistics - Get team statistics
teams.get("/:teamId/statistics", zValidator("param", teamParamsSchema), (c) => {
  try {
    const { teamId } = c.req.valid("param");

    // Find team data
    let teamStats = null;
    for (const leagueStats of mockTeamFixturesStats) {
      const team = leagueStats.team.find((t) => t.id === teamId);
      if (team) {
        teamStats = {
          team,
          league: leagueStats.league,
          country: leagueStats.country,
        };
        break;
      }
    }

    if (!teamStats) {
      return c.json(
        createErrorResponse("NOT_FOUND", `Team with ID ${teamId} not found`),
        404
      );
    }

    // Calculate additional statistics
    const last5Results = teamStats.team.last5;
    const wins = last5Results.filter((match) => match.result === "W").length;
    const draws = last5Results.filter((match) => match.result === "D").length;
    const losses = last5Results.filter((match) => match.result === "L").length;

    const statistics = {
      ...teamStats,
      form: {
        last5: last5Results,
        wins,
        draws,
        losses,
        winPercentage: (wins / 5) * 100,
      },
    };

    return c.json(
      createSuccessResponse(
        statistics,
        "Team statistics retrieved successfully"
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to retrieve team statistics"
      ),
      500
    );
  }
});

export default teams;
