import { describe, it, expect } from "vitest";
import app from "../index";
describe("Leagues API", () => {
    describe("GET /api/v1/leagues", () => {
        it("should return all leagues with pagination", async () => {
            const res = await app.request("/api/v1/leagues?page=1&limit=3");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveLength(3);
            expect(data.pagination).toEqual({
                page: 1,
                limit: 3,
                total: 5,
                totalPages: 2,
            });
        });
        it("should return leagues with default pagination", async () => {
            const res = await app.request("/api/v1/leagues");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveLength(5);
        });
    });
    describe("GET /api/v1/leagues/:leagueId", () => {
        it("should return specific league", async () => {
            const res = await app.request("/api/v1/leagues/39");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.league.id).toBe(39);
            expect(data.data.league.name).toBe("Premier League");
        });
        it("should return 404 for non-existent league", async () => {
            const res = await app.request("/api/v1/leagues/999");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
            expect(data.error).toBe("NOT_FOUND");
        });
        it("should return 404 for invalid league ID", async () => {
            const res = await app.request("/api/v1/leagues/invalid");
            expect(res.status).toBe(404);
        });
    });
    describe("GET /api/v1/leagues/:leagueId/standings", () => {
        it("should return league standings", async () => {
            const res = await app.request("/api/v1/leagues/39/standings");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.data[0]).toHaveProperty("rank");
            expect(data.data[0]).toHaveProperty("team");
            expect(data.data[0]).toHaveProperty("points");
        });
        it("should return 404 for league without standings", async () => {
            const res = await app.request("/api/v1/leagues/999/standings");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
});
