import { describe, it, expect } from '@jest/globals';
import app from '../index';

describe('LiveScore API Simple Tests', () => {
  describe('Basic Endpoints', () => {
    it('should return API info from root endpoint', async () => {
      const req = new Request('http://localhost/');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.message).toBe('LiveScore Backend API');
      expect(data.version).toBe('1.0.0');
      expect(data.documentation).toBe('/docs');
      expect(data.openapi).toBe('/api/openapi.json');
    });

    it('should return health status', async () => {
      const req = new Request('http://localhost/api/health');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.status).toBe('OK');
    });

    it('should return 404 for unknown routes', async () => {
      const req = new Request('http://localhost/api/unknown');
      const res = await app.request(req);
      
      expect(res.status).toBe(404);
      
      const data = await res.json() as any;
      expect(data.error).toBe('Route not found');
    });
  });

  describe('Match Endpoints', () => {
    it('should get all matches', async () => {
      const req = new Request('http://localhost/api/match');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
    });

    it('should get specific match', async () => {
      const req = new Request('http://localhost/api/match/1');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(1);
    });

    it('should return 404 for non-existent match', async () => {
      const req = new Request('http://localhost/api/match/999');
      const res = await app.request(req);
      
      expect(res.status).toBe(404);
      
      const data = await res.json() as any;
      expect(data.error).toBe('Match not found');
    });
  });

  describe('News Endpoints', () => {
    it('should get news list', async () => {
      const req = new Request('http://localhost/api/news');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
    });

    it('should get specific news article', async () => {
      const req = new Request('http://localhost/api/news/1');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(1);
    });
  });

  describe('Documentation Endpoints', () => {
    it('should return OpenAPI specification', async () => {
      const req = new Request('http://localhost/api/openapi.json');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      
      const data = await res.json() as any;
      expect(data.openapi).toBe('3.0.0');
      expect(data.info.title).toBe('LiveScore Backend API');
      expect(data.info.version).toBe('1.0.0');
    });

    it('should serve Swagger UI', async () => {
      const req = new Request('http://localhost/docs');
      const res = await app.request(req);
      
      expect(res.status).toBe(200);
      expect(res.headers.get('content-type')).toContain('text/html');
    });
  });
});