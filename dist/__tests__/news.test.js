import { describe, it, expect } from "vitest";
import app from "../index.js";
describe("News API", () => {
    describe("GET /api/v1/news", () => {
        it("should return news with pagination", async () => {
            const res = await app.request("/api/v1/news?page=1&limit=2");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.length).toBeLessThanOrEqual(2);
            expect(data.pagination).toHaveProperty("page");
            expect(data.pagination).toHaveProperty("limit");
        });
        it("should filter news by category", async () => {
            const res = await app.request("/api/v1/news?category=Match");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 0) {
                expect(data.data.every((article) => article.category.toLowerCase().includes("match"))).toBe(true);
            }
        });
        it("should filter news by tags", async () => {
            const res = await app.request("/api/v1/news?tags=Haaland,Premier League");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 0) {
                expect(data.data.every((article) => article.tags.some((tag) => ["haaland", "premier league"].some((searchTag) => tag.toLowerCase().includes(searchTag))))).toBe(true);
            }
        });
        it("should search news by title and summary", async () => {
            const res = await app.request("/api/v1/news?search=Haaland");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 0) {
                expect(data.data.every((article) => article.title.toLowerCase().includes("haaland") ||
                    article.summary.toLowerCase().includes("haaland"))).toBe(true);
            }
        });
        it("should return news sorted by date (most recent first)", async () => {
            const res = await app.request("/api/v1/news");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 1) {
                const dates = data.data.map((article) => new Date(article.date).getTime());
                for (let i = 1; i < dates.length; i++) {
                    expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
                }
            }
        });
    });
    describe("GET /api/v1/news/categories", () => {
        it("should return all news categories", async () => {
            const res = await app.request("/api/v1/news/categories");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.data.length).toBeGreaterThan(0);
        });
    });
    describe("GET /api/v1/news/tags", () => {
        it("should return all news tags", async () => {
            const res = await app.request("/api/v1/news/tags");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.data.length).toBeGreaterThan(0);
        });
        it("should return unique tags only", async () => {
            const res = await app.request("/api/v1/news/tags");
            const data = await res.json();
            expect(res.status).toBe(200);
            const tags = data.data;
            const uniqueTags = [...new Set(tags)];
            expect(tags.length).toBe(uniqueTags.length);
        });
    });
    describe("GET /api/v1/news/trending", () => {
        it("should return trending news sorted by views", async () => {
            const res = await app.request("/api/v1/news/trending");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            if (data.data.length > 1) {
                const views = data.data.map((article) => article.views);
                for (let i = 1; i < views.length; i++) {
                    expect(views[i - 1]).toBeGreaterThanOrEqual(views[i]);
                }
            }
        });
        it("should return trending news with pagination", async () => {
            const res = await app.request("/api/v1/news/trending?page=1&limit=3");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.length).toBeLessThanOrEqual(3);
            expect(data.pagination).toHaveProperty("page");
        });
    });
    describe("GET /api/v1/news/:newsId", () => {
        it("should return specific news article", async () => {
            const res = await app.request("/api/v1/news/1");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.data.id).toBe(1);
            expect(data.data).toHaveProperty("title");
            expect(data.data).toHaveProperty("summary");
            expect(data.data).toHaveProperty("views");
        });
        it("should increment views when accessing article", async () => {
            const res = await app.request("/api/v1/news/1");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.data.views).toBeGreaterThan(0);
        });
        it("should return 404 for non-existent news article", async () => {
            const res = await app.request("/api/v1/news/9999");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
    describe("GET /api/v1/news/:newsId/related", () => {
        it("should return related news articles", async () => {
            const res = await app.request("/api/v1/news/1/related");
            const data = await res.json();
            expect(res.status).toBe(200);
            expect(data.success).toBe(true);
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.data.length).toBeLessThanOrEqual(5);
            // Should not include the original article
            expect(data.data.every((article) => article.id !== 1)).toBe(true);
        });
        it("should return 404 for non-existent news article", async () => {
            const res = await app.request("/api/v1/news/9999/related");
            const data = await res.json();
            expect(res.status).toBe(404);
            expect(data.success).toBe(false);
        });
    });
});
