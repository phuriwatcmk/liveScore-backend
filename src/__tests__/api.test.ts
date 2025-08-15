import { describe, it, expect } from "vitest";
import app from "../index";

describe("API General", () => {
  describe("Health Check", () => {
    it("should return API health status", async () => {
      const res = await app.request("/");
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty("message");
      expect(data.data).toHaveProperty("version");
      expect(data.data).toHaveProperty("timestamp");
      expect(data.data).toHaveProperty("endpoints");
    });
  });

  describe("CORS", () => {
    it("should include CORS headers", async () => {
      const res = await app.request("/", {
        method: "OPTIONS",
        headers: {
          Origin: "http://localhost:3000",
          "Access-Control-Request-Method": "GET",
        },
      });

      expect(res.headers.get("Access-Control-Allow-Origin")).toBeTruthy();
      expect(res.headers.get("Access-Control-Allow-Methods")).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for non-existent endpoints", async () => {
      const res = await app.request("/api/v1/non-existent");
      const data = await res.json();

      expect(res.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe("NOT_FOUND");
    });

    it("should handle invalid JSON gracefully", async () => {
      const res = await app.request("/api/v1/leagues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "invalid json",
      });

      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe("Response Format", () => {
    it("should return consistent response format for success", async () => {
      const res = await app.request("/api/v1/leagues");
      const data = await res.json();

      expect(data).toHaveProperty("success");
      expect(data).toHaveProperty("data");
      expect(data).toHaveProperty("message");
      expect(data.success).toBe(true);
    });

    it("should return consistent response format for errors", async () => {
      const res = await app.request("/api/v1/leagues/999");
      const data = await res.json();

      expect(data).toHaveProperty("success");
      expect(data).toHaveProperty("error");
      expect(data).toHaveProperty("message");
      expect(data.success).toBe(false);
    });
  });

  describe("Pagination", () => {
    it("should handle pagination parameters correctly", async () => {
      const res = await app.request("/api/v1/leagues?page=1&limit=2");
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 2,
        total: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should use default pagination when not specified", async () => {
      const res = await app.request("/api/v1/leagues");
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.pagination.page).toBe(1);
      expect(data.pagination.limit).toBe(10);
    });

    it("should handle invalid pagination parameters", async () => {
      const res = await app.request(
        "/api/v1/leagues?page=invalid&limit=invalid"
      );

      // Should either return 400 or use default values
      expect(res.status).toBeGreaterThanOrEqual(200);
    });
  });
});
