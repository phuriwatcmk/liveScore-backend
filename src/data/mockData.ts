import type {
  League,
  MatchFixture,
  MatchStats,
  LeagueTeamStats,
  H2HMatch,
  News,
} from "../types/index";

export const mockLeagues: Array<{ league: League; country: { name: string } }> =
  [
    {
      league: {
        id: 39,
        name: "Premier League",
        logo: "https://media.api-sports.io/football/leagues/39.png",
      },
      country: {
        name: "England",
      },
    },
    {
      league: {
        id: 140,
        name: "La Liga",
        logo: "https://media.api-sports.io/football/leagues/140.png",
      },
      country: {
        name: "Spain",
      },
    },
    {
      league: {
        id: 135,
        name: "Serie A",
        logo: "https://media.api-sports.io/football/leagues/135.png",
      },
      country: {
        name: "Italy",
      },
    },
    {
      league: {
        id: 78,
        name: "Bundesliga",
        logo: "https://media.api-sports.io/football/leagues/78.png",
      },
      country: {
        name: "Germany",
      },
    },
    {
      league: {
        id: 61,
        name: "Ligue 1",
        logo: "https://media.api-sports.io/football/leagues/61.png",
      },
      country: {
        name: "France",
      },
    },
  ];

export const mockFixturesToday: MatchFixture[] = [
  {
    fixture: {
      id: 1001,
      date: new Date().toISOString(),
      status: { short: "NS", long: "Not Started" },
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    teams: {
      home: {
        id: 50,
        name: "Man City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      away: {
        id: 42,
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
      },
    },
    goals: { home: null, away: null },
  },
  {
    fixture: {
      id: 1002,
      date: new Date().toISOString(),
      status: { short: "LIVE", long: "In Play" },
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    teams: {
      home: {
        id: 40,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
      },
      away: {
        id: 33,
        name: "Man United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
    },
    goals: { home: 1, away: 0 },
  },
  {
    fixture: {
      id: 1003,
      date: new Date().toISOString(),
      status: { short: "FT", long: "Match Finished" },
    },
    league: {
      id: 140,
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
    teams: {
      home: {
        id: 541,
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
      },
      away: {
        id: 529,
        name: "Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png",
      },
    },
    goals: { home: 2, away: 1 },
  },
  {
    fixture: {
      id: 1004,
      date: new Date().toISOString(),
      status: { short: "NS", long: "Not Started" },
    },
    league: {
      id: 135,
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
    teams: {
      home: {
        id: 496,
        name: "Juventus",
        logo: "https://media.api-sports.io/football/teams/496.png",
      },
      away: {
        id: 489,
        name: "AC Milan",
        logo: "https://media.api-sports.io/football/teams/489.png",
      },
    },
    goals: { home: null, away: null },
  },
  {
    fixture: {
      id: 1005,
      date: new Date().toISOString(),
      status: { short: "2H", long: "Second Half" },
    },
    league: {
      id: 78,
      name: "Bundesliga",
      logo: "https://media.api-sports.io/football/leagues/78.png",
    },
    teams: {
      home: {
        id: 157,
        name: "Bayern Munich",
        logo: "https://media.api-sports.io/football/teams/157.png",
      },
      away: {
        id: 165,
        name: "Borussia Dortmund",
        logo: "https://media.api-sports.io/football/teams/165.png",
      },
    },
    goals: { home: 3, away: 2 },
  },
  {
    fixture: {
      id: 1006,
      date: new Date().toISOString(),
      status: { short: "HT", long: "Halftime" },
    },
    league: {
      id: 61,
      name: "Ligue 1",
      logo: "https://media.api-sports.io/football/leagues/61.png",
    },
    teams: {
      home: {
        id: 85,
        name: "Paris Saint Germain",
        logo: "https://media.api-sports.io/football/teams/85.png",
      },
      away: {
        id: 81,
        name: "Marseille",
        logo: "https://media.api-sports.io/football/teams/81.png",
      },
    },
    goals: { home: 1, away: 1 },
  },
];

export const mockStandingsByLeague = [
  {
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    standings: [
      {
        rank: 1,
        team: {
          id: 50,
          name: "Man City",
          logo: "https://media.api-sports.io/football/teams/50.png",
        },
        points: 90,
        played: 38,
        win: 29,
        draw: 3,
        lose: 6,
        goalsFor: 95,
        goalsAgainst: 32,
        goalDiff: 63,
      },
      {
        rank: 2,
        team: {
          id: 42,
          name: "Arsenal",
          logo: "https://media.api-sports.io/football/teams/42.png",
        },
        points: 88,
        played: 38,
        win: 28,
        draw: 4,
        lose: 6,
        goalsFor: 85,
        goalsAgainst: 35,
        goalDiff: 50,
      },
    ],
  },
  {
    league: {
      id: 140,
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
    standings: [
      {
        rank: 1,
        team: {
          id: 541,
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        points: 95,
        played: 38,
        win: 31,
        draw: 2,
        lose: 5,
        goalsFor: 98,
        goalsAgainst: 28,
        goalDiff: 70,
      },
      {
        rank: 2,
        team: {
          id: 529,
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        points: 85,
        played: 38,
        win: 27,
        draw: 4,
        lose: 7,
        goalsFor: 88,
        goalsAgainst: 35,
        goalDiff: 53,
      },
    ],
  },
  {
    league: {
      id: 135,
      name: "Serie A",
      logo: "https://media.api-sports.io/football/leagues/135.png",
    },
    standings: [
      {
        rank: 1,
        team: {
          id: 496,
          name: "Juventus",
          logo: "https://media.api-sports.io/football/teams/496.png",
        },
        points: 82,
        played: 38,
        win: 25,
        draw: 7,
        lose: 6,
        goalsFor: 75,
        goalsAgainst: 32,
        goalDiff: 43,
      },
      {
        rank: 2,
        team: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
        },
        points: 78,
        played: 38,
        win: 24,
        draw: 6,
        lose: 8,
        goalsFor: 72,
        goalsAgainst: 38,
        goalDiff: 34,
      },
    ],
  },
  {
    league: {
      id: 78,
      name: "Bundesliga",
      logo: "https://media.api-sports.io/football/leagues/78.png",
    },
    standings: [
      {
        rank: 1,
        team: {
          id: 157,
          name: "Bayern Munich",
          logo: "https://media.api-sports.io/football/teams/157.png",
        },
        points: 89,
        played: 34,
        win: 28,
        draw: 5,
        lose: 1,
        goalsFor: 92,
        goalsAgainst: 25,
        goalDiff: 67,
      },
      {
        rank: 2,
        team: {
          id: 165,
          name: "Borussia Dortmund",
          logo: "https://media.api-sports.io/football/teams/165.png",
        },
        points: 71,
        played: 34,
        win: 22,
        draw: 5,
        lose: 7,
        goalsFor: 78,
        goalsAgainst: 42,
        goalDiff: 36,
      },
    ],
  },
];

export const mockStats: MatchStats[] = [
  {
    fixture: {
      id: 1001,
      date: new Date().toISOString(),
      status: { short: "FT", long: "Match Finished" },
    },
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    teams: {
      home: {
        id: 50,
        name: "Man City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      away: {
        id: 42,
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
      },
    },
    goals: { home: 2, away: 1 },
    statistics: [
      {
        team: {
          name: "Man City",
          logo: "https://media.api-sports.io/football/teams/50.png",
        },
        statistic: "Shots on Goal",
        value: 8,
      },
      {
        team: {
          name: "Arsenal",
          logo: "https://media.api-sports.io/football/teams/42.png",
        },
        statistic: "Shots on Goal",
        value: 5,
      },
    ],
    events: [
      {
        time: 23,
        team: {
          name: "Man City",
          logo: "https://media.api-sports.io/football/teams/50.png",
        },
        type: "Goal",
        player: "Haaland",
        assist: "De Bruyne",
      },
    ],
    injuries: [],
    odds: { home: "2.05", draw: "3.30", away: "3.75" },
    topScorers: [
      {
        name: "Erling Haaland",
        team: {
          name: "Man City",
          logo: "https://media.api-sports.io/football/teams/50.png",
        },
        goals: 27,
      },
    ],
    lineups: {
      team: {
        name: "Man City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      formation: "4-3-3",
      coach: "Pep Guardiola",
      startXI: [
        { name: "Ederson", position: "GK", number: 31 },
        { name: "Kyle Walker", position: "RB", number: 2 },
      ],
    },
  },
  {
    fixture: {
      id: 1003,
      date: new Date().toISOString(),
      status: { short: "FT", long: "Match Finished" },
    },
    league: {
      id: 140,
      name: "La Liga",
      logo: "https://media.api-sports.io/football/leagues/140.png",
    },
    teams: {
      home: {
        id: 541,
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
      },
      away: {
        id: 529,
        name: "Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png",
      },
    },
    goals: { home: 2, away: 1 },
    statistics: [
      {
        team: {
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        statistic: "Ball Possession",
        value: "58%",
      },
      {
        team: {
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        statistic: "Ball Possession",
        value: "42%",
      },
      {
        team: {
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        statistic: "Total Shots",
        value: 12,
      },
      {
        team: {
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        statistic: "Total Shots",
        value: 8,
      },
    ],
    events: [
      {
        time: 18,
        team: {
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        type: "Goal",
        player: "Vinicius Jr",
        assist: "Modric",
      },
      {
        time: 34,
        team: {
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        type: "Goal",
        player: "Lewandowski",
      },
      {
        time: 67,
        team: {
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        type: "Goal",
        player: "Bellingham",
        assist: "Vinicius Jr",
      },
    ],
    injuries: [
      {
        team: {
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        player: "Pedri",
        reason: "Muscle injury",
        date: "2024-08-10",
      },
    ],
    odds: { home: "2.20", draw: "3.10", away: "3.25" },
    topScorers: [
      {
        name: "Vinicius Jr",
        team: {
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
        },
        goals: 24,
      },
      {
        name: "Lewandowski",
        team: {
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
        },
        goals: 22,
      },
    ],
    lineups: {
      team: {
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
      },
      formation: "4-3-3",
      coach: "Carlo Ancelotti",
      startXI: [
        { name: "Courtois", position: "GK", number: 1 },
        { name: "Carvajal", position: "RB", number: 2 },
        { name: "Militao", position: "CB", number: 3 },
        { name: "Alaba", position: "CB", number: 4 },
      ],
    },
  },
];

export const mockTeamFixturesStats: LeagueTeamStats[] = [
  {
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    country: { name: "England" },
    team: [
      {
        id: 50,
        name: "Man City",
        logo: "https://media.api-sports.io/football/teams/50.png",
        nextMatch: {
          fixture: { id: 1001 },
          date: "2025-06-29T17:30:00Z",
          opponent: "Arsenal",
          opponentLogo: "https://media.api-sports.io/football/teams/42.png",
          home: true,
        },
        last5: [
          {
            date: "2025-06-23",
            opponent: "Man United",
            result: "W",
            score: "3-1",
          },
          {
            date: "2025-06-17",
            opponent: "Chelsea",
            result: "W",
            score: "2-0",
          },
          {
            date: "2025-06-10",
            opponent: "Liverpool",
            result: "D",
            score: "1-1",
          },
          {
            date: "2025-06-03",
            opponent: "Tottenham",
            result: "W",
            score: "4-2",
          },
          {
            date: "2025-05-27",
            opponent: "Brighton",
            result: "L",
            score: "0-1",
          },
        ],
      },
    ],
  },
];

export const mockH2HWithFixtures: H2HMatch[] = [
  {
    league: {
      id: 39,
      name: "Premier League",
      logo: "https://media.api-sports.io/football/leagues/39.png",
    },
    teams: {
      home: {
        id: 50,
        name: "Man City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      away: {
        id: 42,
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
      },
    },
    fixtures: [
      {
        fixture_id: 1001,
        date: "2025-03-15T15:00:00+00:00",
        venue: "Etihad Stadium",
        home: "Man City",
        away: "Arsenal",
        score: "2-1",
        events: [
          {
            minute: 23,
            type: "Goal",
            team: "Man City",
            player: "Erling Haaland",
          },
        ],
      },
    ],
  },
];

export const mockNews: News[] = [
  {
    id: 1,
    title:
      "🔥 เฮอร์แลนด์ทำสถิติใหม่! ซัดไฮแทรกรอบ 15 นาทีพาแมนซิตี้ถล่มเชลซี 5-0",
    summary:
      "เออร์ลิง เฮอร์แลนด์ เขียนประวัติศาสตร์ใหม่ด้วยการทำแฮตทริกภายใน 15 นาทีแรก",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-30T22:30:00Z",
    category: "Match Highlight",
    source: "ESPN Thailand",
    tags: ["Haaland", "Man City", "Premier League", "Hat-trick", "Record"],
    views: 45720,
    readTime: "3 นาที",
  },
  {
    id: 2,
    title: "🚨 Real Madrid ปิดดีล Mbappe อย่างเป็นทางการ สัญญา 5 ปี!",
    summary: "เรอัล มาดริด ประกาศเซ็น คิเลียน เอ็มบั๊ป เป็นนักเตะของสโมสรอย่างเป็นทางการ",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-29T14:00:00Z",
    category: "Transfer News",
    source: "Marca",
    tags: ["Mbappe", "Real Madrid", "La Liga", "Transfer", "Signing"],
    views: 128450,
    readTime: "5 นาที",
  },
  {
    id: 3,
    title: "⚽ Liverpool vs Arsenal: Derby แห่งการแก้แค้น วันอาทิตย์นี้",
    summary: "ลิเวอร์พูลเตรียมต้อนรับอาร์เซนอลในเกมคู่เด็ดพรีเมียร์ลีก",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-28T18:45:00Z",
    category: "Match Preview",
    source: "Sky Sports",
    tags: ["Liverpool", "Arsenal", "Premier League", "Preview", "Anfield"],
    views: 67890,
    readTime: "4 นาที",
  },
  {
    id: 4,
    title: "🏆 Juventus คว้าแชมป์ Serie A สมัยที่ 37 หลังชนะ AC Milan 2-1",
    summary: "ยูเวนตุสคว้าแชมป์อิตาลี่สมัยใหม่หลังจากเอาชนะปิศาจแดงได้แบบสุดมัน",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-27T21:00:00Z",
    category: "Championship",
    source: "Gazzetta dello Sport",
    tags: ["Juventus", "Serie A", "AC Milan", "Championship", "Title"],
    views: 89234,
    readTime: "6 นาที",
  },
  {
    id: 5,
    title: "🔄 Bayern Munich ปรับโครงสร้างทีม เล็งคว้า 3 ดาวใหม่",
    summary: "บาเยิร์น มิวนิค เตรียมปฏิรูปทีมครั้งใหญ่ในช่วงตลาดซัมเมอร์",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-26T16:30:00Z",
    category: "Transfer Rumors",
    source: "Bild",
    tags: ["Bayern Munich", "Bundesliga", "Transfer", "Rumors", "Summer"],
    views: 45678,
    readTime: "4 นาที",
  },
  {
    id: 6,
    title: "📊 สถิติพรีเมียร์ลีก: 5 นักเตะทำประตูมากสุดในซีซั่นนี้",
    summary: "รวมสถิติดาวซัลโวพรีเมียร์ลีกก่อนเข้าสู่เกมสุดท้ายของฤดูกาล",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop&crop=center",
    date: "2025-06-25T12:15:00Z",
    category: "Statistics",
    source: "Premier League",
    tags: ["Premier League", "Top Scorers", "Statistics", "Season", "Goals"],
    views: 34567,
    readTime: "3 นาที",
  },
];
