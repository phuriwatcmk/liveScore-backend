import { Hono } from "hono";
import type { TeamStatistics, Standing, Match, Team } from "../types/index.js";
import { mockLeagues, mockStandingsByLeague } from "../mock-data.js";

const teamRoutes = new Hono();

const mockTeams: Team[] = [
  {
    id: 1,
    name: "Manchester United",
    logo: "https://media.api-sports.io/football/teams/33.png",
  },
  {
    id: 2,
    name: "Liverpool",
    logo: "https://media.api-sports.io/football/teams/40.png",
  },
  {
    id: 3,
    name: "Arsenal",
    logo: "https://media.api-sports.io/football/teams/42.png",
  },
  {
    id: 4,
    name: "Chelsea",
    logo: "https://media.api-sports.io/football/teams/49.png",
  },
  {
    id: 5,
    name: "Manchester City",
    logo: "https://media.api-sports.io/football/teams/50.png",
  },
];

const mockTeamStats: TeamStatistics[] = [
  {
    team: mockTeams[0],
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    stats: {
      played: 38,
      wins: 22,
      draws: 8,
      losses: 8,
      goalsFor: 65,
      goalsAgainst: 45,
      points: 74,
    },
  },
  {
    team: mockTeams[1],
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    stats: {
      played: 38,
      wins: 24,
      draws: 10,
      losses: 4,
      goalsFor: 86,
      goalsAgainst: 41,
      points: 82,
    },
  },
  {
    team: mockTeams[2],
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    stats: {
      played: 38,
      wins: 26,
      draws: 6,
      losses: 6,
      goalsFor: 91,
      goalsAgainst: 29,
      points: 84,
    },
  },
];

const mockTeamMatches: Match[] = [
  {
    id: 201,
    date: "2024-08-10T15:00:00Z",
    status: "FT",
    homeTeam: mockTeams[0],
    awayTeam: {
      id: 6,
      name: "Fulham",
      logo: "https://media.api-sports.io/football/teams/36.png",
    },
    score: { home: 1, away: 0 },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 202,
    date: "2024-08-17T17:30:00Z",
    status: "SCH",
    homeTeam: {
      id: 7,
      name: "Brighton",
      logo: "https://media.api-sports.io/football/teams/51.png",
    },
    awayTeam: mockTeams[0],
    score: { home: null, away: null },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
];

teamRoutes.get("/:id/stats", (c) => {
  const teamId = parseInt(c.req.param("id"));

  if (isNaN(teamId)) {
    return c.json({ error: "Invalid team ID" }, 400);
  }

  const teamStats = mockTeamStats.find((ts) => ts.team.id === teamId);

  if (!teamStats) {
    return c.json({ error: "Team statistics not found" }, 404);
  }

  return c.json({
    success: true,
    data: teamStats,
  });
});

teamRoutes.get("/:id/overview", (c) => {
  const teamId = parseInt(c.req.param("id"));

  if (isNaN(teamId)) {
    return c.json({ error: "Invalid team ID" }, 400);
  }

  const team = mockTeams.find((t) => t.id === teamId);
  const teamStats = mockTeamStats.find((ts) => ts.team.id === teamId);
  const recentMatches = mockTeamMatches
    .filter((m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId)
    .slice(0, 5);

  if (!team) {
    return c.json({ error: "Team not found" }, 404);
  }

  return c.json({
    success: true,
    data: {
      team,
      stats: teamStats?.stats || null,
      recentMatches,
      form: ["W", "W", "L", "D", "W"],
    },
  });
});

teamRoutes.get("/:id/matches", (c) => {
  const teamId = parseInt(c.req.param("id"));
  const status = c.req.query("status");
  const limit = parseInt(c.req.query("limit") || "20");

  if (isNaN(teamId)) {
    return c.json({ error: "Invalid team ID" }, 400);
  }

  let matches = mockTeamMatches.filter(
    (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId
  );

  if (status) {
    matches = matches.filter((m) => m.status === status);
  }

  matches = matches
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return c.json({
    success: true,
    data: matches,
    total: matches.length,
  });
});

teamRoutes.get("/:id/standings", (c) => {
  const leagueId = parseInt(c.req.param("id"));

  if (isNaN(leagueId)) {
    return c.json({ error: "Invalid league ID" }, 400);
  }

  const leagueStanding = mockStandingsByLeague.find(
    (ls) => ls.league.id === leagueId
  );

  if (!leagueStanding) {
    return c.json({ error: "League standings not found" }, 404);
  }

  const standings = leagueStanding.stats.sort((a, b) => a.rank - b.rank);

  return c.json({
    success: true,
    data: {
      league: leagueStanding.league,
      standings,
    },
  });
});

export default teamRoutes;
