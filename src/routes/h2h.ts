import { Hono } from "hono";
import type { Match } from "../types/index.js";

const h2hRoutes = new Hono();

const mockH2HMatches: Match[] = [
  {
    id: 101,
    fixtureId: 1001,
    date: "2024-03-17T16:30:00Z",
    status: "FT",
    homeTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    awayTeam: {
      id: 2,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
    score: {
      home: 2,
      away: 2,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 102,
    fixtureId: 1002,
    date: "2023-12-17T17:30:00Z",
    status: "FT",
    homeTeam: {
      id: 2,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
    awayTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    score: {
      home: 0,
      away: 0,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 103,
    fixtureId: 1003,
    date: "2023-08-28T16:30:00Z",
    status: "FT",
    homeTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    awayTeam: {
      id: 2,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
    score: {
      home: 2,
      away: 1,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 104,
    fixtureId: 1004,
    date: "2023-04-02T16:30:00Z",
    status: "FT",
    homeTeam: {
      id: 2,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
    awayTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    score: {
      home: 7,
      away: 0,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 105,
    fixtureId: 1005,
    date: "2022-08-22T20:00:00Z",
    status: "FT",
    homeTeam: {
      id: 1,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    awayTeam: {
      id: 2,
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
    },
    score: {
      home: 2,
      away: 1,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 2,
    fixtureId: 1006,
    date: "2024-08-15T17:30:00Z",
    status: "LIVE",
    homeTeam: {
      id: 3,
      name: "Arsenal",
      logo: "https://media.api-sports.io/football/teams/42.png",
    },
    awayTeam: {
      id: 4,
      name: "Chelsea",
      logo: "https://media.api-sports.io/football/teams/49.png",
    },
    score: {
      home: 1,
      away: 0,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 3,
    fixtureId: 1007,
    date: "2024-08-16T20:00:00Z",
    status: "FT",
    homeTeam: {
      id: 5,
      name: "Real Madrid",
      logo: "https://media.api-sports.io/football/teams/541.png",
    },
    awayTeam: {
      id: 6,
      name: "Barcelona",
      logo: "https://media.api-sports.io/football/teams/529.png",
    },
    score: {
      home: 3,
      away: 2,
    },
    league: {
      id: 140,
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
  },
  {
    id: 4,
    fixtureId: 1008,
    date: "2024-08-17T14:00:00Z",
    status: "SCHEDULED",
    homeTeam: {
      id: 7,
      name: "Bayern Munich",
      logo: "https://media.api-sports.io/football/teams/157.png",
    },
    awayTeam: {
      id: 8,
      name: "Borussia Dortmund",
      logo: "https://media.api-sports.io/football/teams/165.png",
    },
    score: {
      home: 0,
      away: 0,
    },
    league: {
      id: 78,
      name: "Bundesliga",
      logo: "https://media.api-sports.io/football/leagues/78.png",
    },
  },
  {
    id: 5,
    fixtureId: 1009,
    date: "2024-08-17T19:45:00Z",
    status: "LIVE",
    homeTeam: {
      id: 9,
      name: "Juventus",
      logo: "https://media.api-sports.io/football/teams/496.png",
    },
    awayTeam: {
      id: 10,
      name: "AC Milan",
      logo: "https://media.api-sports.io/football/teams/489.png",
    },
    score: {
      home: 0,
      away: 1,
    },
    league: {
      id: 135,
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
  },
  {
    id: 6,
    fixtureId: 1010,
    date: "2024-08-18T16:00:00Z",
    status: "FT",
    homeTeam: {
      id: 11,
      name: "Paris Saint Germain",
      logo: "https://media.api-sports.io/football/teams/85.png",
    },
    awayTeam: {
      id: 12,
      name: "Olympique Marseille",
      logo: "https://media.api-sports.io/football/teams/81.png",
    },
    score: {
      home: 4,
      away: 0,
    },
    league: {
      id: 61,
      name: "Ligue 1",
      logo: "https://media.api-sports.io/football/leagues/61.png",
    },
  },
  {
    id: 7,
    fixtureId: 1011,
    date: "2024-08-18T21:00:00Z",
    status: "SCHEDULED",
    homeTeam: {
      id: 13,
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png",
    },
    awayTeam: {
      id: 14,
      name: "Tottenham",
      logo: "https://media.api-sports.io/football/teams/47.png",
    },
    score: {
      home: 0,
      away: 0,
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
  },
  {
    id: 8,
    fixtureId: 1012,
    date: "2024-08-19T18:30:00Z",
    status: "HALFTIME",
    homeTeam: {
      id: 15,
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png",
    },
    awayTeam: {
      id: 16,
      name: "Valencia",
      logo: "https://media.api-sports.io/football/teams/532.png",
    },
    score: {
      home: 1,
      away: 1,
    },
    league: {
      id: 140,
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
  },
  {
    id: 9,
    fixtureId: 1013,
    date: "2024-08-20T15:30:00Z",
    status: "FT",
    homeTeam: {
      id: 17,
      name: "Inter",
      logo: "https://media.api-sports.io/football/teams/505.png",
    },
    awayTeam: {
      id: 18,
      name: "Napoli",
      logo: "https://media.api-sports.io/football/teams/492.png",
    },
    score: {
      home: 2,
      away: 3,
    },
    league: {
      id: 135,
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
  },
  {
    id: 10,
    fixtureId: 1014,
    date: "2024-08-21T13:00:00Z",
    status: "POSTPONED",
    homeTeam: {
      id: 19,
      name: "RB Leipzig",
      logo: "https://media.api-sports.io/football/teams/173.png",
    },
    awayTeam: {
      id: 20,
      name: "Bayer Leverkusen",
      logo: "https://media.api-sports.io/football/teams/168.png",
    },
    score: {
      home: 0,
      away: 0,
    },
    league: {
      id: 78,
      name: "Bundesliga",
      logo: "https://media.api-sports.io/football/leagues/78.png",
    },
  },
];

h2hRoutes.get("/fixture/:fixture_id", (c) => {
  const fixtureId = parseInt(c.req.param("fixture_id"));

  if (isNaN(fixtureId)) {
    return c.json({ error: "Invalid fixture ID" }, 400);
  }

  const match = mockH2HMatches.find((m) => m.fixtureId === fixtureId);

  if (!match) {
    return c.json({ error: "Match not found" }, 404);
  }

  return c.json({
    success: true,
    data: match,
  });
});

export default h2hRoutes;
