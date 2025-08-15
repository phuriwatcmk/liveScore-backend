import { cors } from "hono/cors";
export const corsMiddleware = cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://your-frontend-domain.com",
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
});
