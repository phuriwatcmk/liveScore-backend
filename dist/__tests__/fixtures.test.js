import { describe, it, expect } from "vitest";
import app from "../index";
describe("Fixtures API", () => {
    describe("GET /api/v1/fixtures", () => {
        it("should return fixtures with pagination", async () => {
            const res = await app.request("/api/v1/fixtures?page=1&limit=1");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveLength(1);
            expect(data.pagination).toEqual({
                page: 1,
                limit: 1,
                total: 6,
                totalPages: 6,
            });
        });
        it("should filter fixtures by league", async () => {
            const res = await app.request("/api/v1/fixtures?league=39");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.every((fixture) => fixture.league.id === 39)).toBe(true);
        });
        it("should filter fixtures by status", async () => {
            const res = await app.request("/api/v1/fixtures?status=LIVE");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.every((fixture) => fixture.fixture.status.short === "LIVE")).toBe(true);
        });
    });
    describe("GET /api/v1/fixtures/today", () => {
        it("should return today's fixtures", async () => {
            const res = await app.request("/api/v1/fixtures/today");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(Array.isArray(data.data)).toBe(true);
        });
    });
    describe("GET /api/v1/fixtures/live", () => {
        it("should return live fixtures", async () => {
            const res = await app.request("/api/v1/fixtures/live");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.every((fixture) => fixture.fixture.status.short === "LIVE")).toBe(true);
        });
    });
    describe("GET /api/v1/fixtures/:fixtureId", () => {
        it("should return specific fixture", async () => {
            const res = await app.request("/api/v1/fixtures/1001");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.fixture.id).toBe(1001);
        });
        it("should return 404 for non-existent fixture", async () => {
            const res = await app.request("/api/v1/fixtures/9999");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
    describe("GET /api/v1/fixtures/:fixtureId/stats", () => {
        it("should return fixture statistics", async () => {
            const res = await app.request("/api/v1/fixtures/1001/stats");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveProperty("statistics");
            expect(data.data).toHaveProperty("events");
            expect(data.data).toHaveProperty("lineups");
        });
        it("should return 404 for fixture without stats", async () => {
            const res = await app.request("/api/v1/fixtures/9999/stats");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
});
