import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { mockFixturesToday, mockStats } from "../data/mockData.js";
import {
  createSuccessResponse,
  createErrorResponse,
  paginate,
} from "../utils/response.js";
import {
  fixtureParamsSchema,
  fixturesQuerySchema,
} from "../validators/index.js";

const fixtures = new Hono();

// GET /fixtures - Get fixtures with filters
fixtures.get("/", zValidator("query", fixturesQuerySchema), (c) => {
  try {
    const { page, limit, date, league, status } = c.req.valid("query");

    let filteredFixtures = [...mockFixturesToday];

    // Filter by date
    if (date) {
      const filterDate = new Date(date).toDateString();
      filteredFixtures = filteredFixtures.filter(
        (fixture) =>
          new Date(fixture.fixture.date).toDateString() === filterDate
      );
    }

    // Filter by league
    if (league) {
      filteredFixtures = filteredFixtures.filter(
        (fixture) => fixture.league.id === league
      );
    }

    // Filter by status
    if (status) {
      filteredFixtures = filteredFixtures.filter(
        (fixture) => fixture.fixture.status.short === status
      );
    }

    const { data, pagination } = paginate(filteredFixtures, page, limit);

    return c.json(
      createSuccessResponse(data, "Fixtures retrieved successfully", pagination)
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve fixtures"),
      500
    );
  }
});

// GET /fixtures/today - Get today's fixtures
fixtures.get("/today", zValidator("query", fixturesQuerySchema), (c) => {
  try {
    const { page, limit } = c.req.valid("query");

    const today = new Date().toDateString();
    const todayFixtures = mockFixturesToday.filter(
      (fixture) => new Date(fixture.fixture.date).toDateString() === today
    );

    const { data, pagination } = paginate(todayFixtures, page, limit);

    return c.json(
      createSuccessResponse(
        data,
        "Today's fixtures retrieved successfully",
        pagination
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to retrieve today's fixtures"
      ),
      500
    );
  }
});

// GET /fixtures/live - Get live fixtures
fixtures.get("/live", zValidator("query", fixturesQuerySchema), (c) => {
  try {
    const { page, limit } = c.req.valid("query");

    const liveFixtures = mockFixturesToday.filter(
      (fixture) => fixture.fixture.status.short === "LIVE"
    );

    const { data, pagination } = paginate(liveFixtures, page, limit);

    return c.json(
      createSuccessResponse(
        data,
        "Live fixtures retrieved successfully",
        pagination
      )
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve live fixtures"),
      500
    );
  }
});

// GET /fixtures/:fixtureId - Get specific fixture
fixtures.get("/:fixtureId", zValidator("param", fixtureParamsSchema), (c) => {
  try {
    const { fixtureId } = c.req.valid("param");

    const fixture = mockFixturesToday.find((f) => f.fixture.id === fixtureId);

    if (!fixture) {
      return c.json(
        createErrorResponse(
          "NOT_FOUND",
          `Fixture with ID ${fixtureId} not found`
        ),
        404
      );
    }

    return c.json(
      createSuccessResponse(fixture, "Fixture retrieved successfully")
    );
  } catch (error) {
    return c.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to retrieve fixture"),
      500
    );
  }
});

// GET /fixtures/:fixtureId/stats - Get fixture statistics
fixtures.get(
  "/:fixtureId/stats",
  zValidator("param", fixtureParamsSchema),
  (c) => {
    try {
      const { fixtureId } = c.req.valid("param");

      const stats = mockStats.find((s) => s.fixture.id === fixtureId);

      if (!stats) {
        return c.json(
          createErrorResponse(
            "NOT_FOUND",
            `Statistics for fixture ${fixtureId} not found`
          ),
          404
        );
      }

      return c.json(
        createSuccessResponse(
          stats,
          "Fixture statistics retrieved successfully"
        )
      );
    } catch (error) {
      return c.json(
        createErrorResponse(
          "INTERNAL_ERROR",
          "Failed to retrieve fixture statistics"
        ),
        500
      );
    }
  }
);

export default fixtures;
