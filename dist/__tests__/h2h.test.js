import { describe, it, expect } from "vitest";
import app from "../index";
describe("Head-to-Head API", () => {
    describe("GET /api/v1/h2h/:team1Id/:team2Id", () => {
        it("should return head-to-head records with statistics", async () => {
            const res = await app.request("/api/v1/h2h/50/42");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data).toHaveProperty("matches");
            expect(data.data).toHaveProperty("statistics");
            const stats = data.data.statistics;
            expect(stats).toHaveProperty("totalMatches");
            expect(stats).toHaveProperty("team1");
            expect(stats).toHaveProperty("team2");
            expect(stats).toHaveProperty("draws");
            expect(stats.team1).toHaveProperty("wins");
            expect(stats.team1).toHaveProperty("winPercentage");
            expect(stats.team1).toHaveProperty("totalGoals");
            expect(stats.team1).toHaveProperty("averageGoals");
        });
        it("should return head-to-head records with pagination", async () => {
            const res = await app.request("/api/v1/h2h/50/42?page=1&limit=1");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.matches.length > 0) {
                expect(data.pagination).toHaveProperty("page");
                expect(data.pagination).toHaveProperty("limit");
            }
        });
        it("should work with teams in reverse order", async () => {
            const res1 = await app.request("/api/v1/h2h/50/42");
            const res2 = await app.request("/api/v1/h2h/42/50");
            if (res1.status === 200 && res2.status === 200) {
                const data1 = await res1.json();
                const data2 = await res2.json();
                expect(data1.data.statistics.totalMatches).toBe(data2.data.statistics.totalMatches);
            }
        });
        it("should return 404 for teams with no head-to-head records", async () => {
            const res = await app.request("/api/v1/h2h/9999/9998");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
        it("should calculate statistics correctly", async () => {
            const res = await app.request("/api/v1/h2h/50/42");
            if (res.status === 200) {
                const data = await res.json();
                const stats = data.data.statistics;
                expect(stats.team1.wins + stats.team2.wins + stats.draws).toBe(stats.totalMatches);
                expect(stats.team1.winPercentage +
                    stats.team2.winPercentage +
                    stats.drawPercentage).toBeCloseTo(100, 1);
            }
        });
    });
    describe("GET /api/v1/h2h/:team1Id/:team2Id/recent", () => {
        it("should return recent matches between teams", async () => {
            const res = await app.request("/api/v1/h2h/50/42/recent");
            if (res.status === 200) {
                const data = await res.json();
                expect(data.success).toBe(true);
                expect(Array.isArray(data.data)).toBe(true);
                expect(data.data.length).toBeLessThanOrEqual(5);
                if (data.data.length > 1) {
                    // Check if sorted by date (most recent first)
                    const dates = data.data.map((match) => new Date(match.date).getTime());
                    for (let i = 1; i < dates.length; i++) {
                        expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
                    }
                }
            }
        });
        it("should return 404 for teams with no recent matches", async () => {
            const res = await app.request("/api/v1/h2h/9999/9998/recent");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
});
