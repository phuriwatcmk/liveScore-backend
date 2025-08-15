import { describe, it, expect } from "vitest";
import app from "../index.js";
describe("Teams API", () => {
    describe("GET /api/v1/teams/:teamId", () => {
        it("should return team overview", async () => {
            const res = await app.request("/api/v1/teams/50");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.id).toBe(50);
            expect(data.data.name).toBe("Man City");
            expect(data.data).toHaveProperty("league");
            expect(data.data).toHaveProperty("nextMatch");
            expect(data.data).toHaveProperty("last5");
        });
        it("should return 404 for non-existent team", async () => {
            const res = await app.request("/api/v1/teams/9999");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
    describe("GET /api/v1/teams/:teamId/matches", () => {
        it("should return team matches", async () => {
            const res = await app.request("/api/v1/teams/50");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
        });
        it("should return team matches with pagination", async () => {
            const res = await app.request("/api/v1/teams/50/matches?page=1&limit=1");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 0) {
                expect(data.pagination).toHaveProperty("page");
                expect(data.pagination).toHaveProperty("limit");
            }
        });
    });
    describe("GET /api/v1/teams/:teamId/standings", () => {
        it("should return team standings", async () => {
            const res = await app.request("/api/v1/teams/50/standings");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveProperty("standings");
            expect(data.data).toHaveProperty("leagueId");
        });
    });
    describe("GET /api/v1/teams/:teamId/statistics", () => {
        it("should return team statistics", async () => {
            const res = await app.request("/api/v1/teams/50/statistics");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveProperty("form");
            expect(data.data.form).toHaveProperty("wins");
            expect(data.data.form).toHaveProperty("draws");
            expect(data.data.form).toHaveProperty("losses");
            expect(data.data.form).toHaveProperty("winPercentage");
        });
        it("should calculate form statistics correctly", async () => {
            const res = await app.request("/api/v1/teams/50/statistics");
            const data = await res.json();
            expect(res.status).toBe(200);
            const form = data.data.form;
            expect(form.wins + form.draws + form.losses).toBe(5);
            expect(form.winPercentage).toBeGreaterThanOrEqual(0);
            expect(form.winPercentage).toBeLessThanOrEqual(100);
        });
    });
});
