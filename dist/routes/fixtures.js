import { Hono } from "hono";
import { mockFixturesToday, mockStats } from "../data/mockData";
import { createSuccessResponse, createErrorResponse, paginate, } from "../utils/response";
const fixtures = new Hono();
// GET /fixtures - Get fixtures with filters
fixtures.get("/", (c) => {
    try {
        const query = c.req.query();
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
        const date = query.date;
        const league = query.league ? parseInt(query.league, 10) : undefined;
        const status = query.status;
        let filteredFixtures = [...mockFixturesToday];
        // Filter by date
        if (date) {
            const filterDate = new Date(date).toDateString();
            filteredFixtures = filteredFixtures.filter((fixture) => new Date(fixture.fixture.date).toDateString() === filterDate);
        }
        // Filter by league
        if (league) {
            filteredFixtures = filteredFixtures.filter((fixture) => fixture.league.id === league);
        }
        // Filter by status
        if (status) {
            filteredFixtures = filteredFixtures.filter((fixture) => fixture.fixture.status.short === status);
        }
        const { data, pagination } = paginate(filteredFixtures, page, limit);
        return c.json(createSuccessResponse(data, "Fixtures retrieved successfully", pagination));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve fixtures"), 500);
    }
});
// GET /fixtures/today - Get today's fixtures
fixtures.get("/today", (c) => {
    try {
        const query = c.req.query();
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
        const today = new Date().toDateString();
        const todayFixtures = mockFixturesToday.filter((fixture) => new Date(fixture.fixture.date).toDateString() === today);
        const { data, pagination } = paginate(todayFixtures, page, limit);
        return c.json(createSuccessResponse(data, "Today's fixtures retrieved successfully", pagination));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve today's fixtures"), 500);
    }
});
// GET /fixtures/live - Get live fixtures
fixtures.get("/live", (c) => {
    try {
        const query = c.req.query();
        const page = query.page ? parseInt(query.page, 10) : 1;
        const limit = query.limit ? parseInt(query.limit, 10) : 10;
        const liveFixtures = mockFixturesToday.filter((fixture) => fixture.fixture.status.short === "LIVE");
        const { data, pagination } = paginate(liveFixtures, page, limit);
        return c.json(createSuccessResponse(data, "Live fixtures retrieved successfully", pagination));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve live fixtures"), 500);
    }
});
// GET /fixtures/:fixtureId - Get specific fixture
fixtures.get("/:fixtureId", (c) => {
    try {
        const fixtureId = parseInt(c.req.param("fixtureId"), 10);
        const fixture = mockFixturesToday.find((f) => f.fixture.id === fixtureId);
        if (!fixture) {
            return c.json(createErrorResponse("NOT_FOUND", `Fixture with ID ${fixtureId} not found`), 404);
        }
        return c.json(createSuccessResponse(fixture, "Fixture retrieved successfully"));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve fixture"), 500);
    }
});
// GET /fixtures/:fixtureId/stats - Get fixture statistics
fixtures.get("/:fixtureId/stats", (c) => {
    try {
        const fixtureId = parseInt(c.req.param("fixtureId"), 10);
        const stats = mockStats.find((s) => s.fixture.id === fixtureId);
        if (!stats) {
            return c.json(createErrorResponse("NOT_FOUND", `Statistics for fixture ${fixtureId} not found`), 404);
        }
        return c.json(createSuccessResponse(stats, "Fixture statistics retrieved successfully"));
    }
    catch (error) {
        return c.json(createErrorResponse("INTERNAL_ERROR", "Failed to retrieve fixture statistics"), 500);
    }
});
export default fixtures;
