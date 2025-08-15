# Deployment Guide

## 🚀 Quick Start Deployment Options

### 1. Vercel (Recommended for Serverless)

**Setup:**
```bash
npm install -g vercel
vercel login
vercel
```

**Features:**
- Zero configuration needed (uses `vercel.json`)
- Automatic HTTPS and global CDN
- Perfect for Hono APIs
- Free tier available

---

### 2. Railway

**Setup:**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

**Features:**
- Simple deployment with `railway.toml`
- Built-in database support
- Auto-scaling
- GitHub integration

---

### 3. Render

**Setup:**
1. Connect your GitHub repository to Render
2. Use the included `render.yaml` configuration
3. Deploy automatically on git push

**Features:**
- Free tier available
- Auto-deploy from GitHub
- Built-in SSL

---

### 4. Fly.io (Docker)

**Setup:**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

**Features:**
- Global edge deployment
- Uses included `Dockerfile`
- Great performance

---

### 5. DigitalOcean App Platform

**Setup:**
1. Connect your GitHub repository
2. Choose Node.js environment
3. Set build command: `pnpm run build`
4. Set run command: `pnpm start`

---

## 📋 Pre-deployment Checklist

- [ ] Build works locally: `pnpm run build`
- [ ] Tests pass: `pnpm test`
- [ ] Environment variables configured
- [ ] Database connection (if needed)
- [ ] CORS settings updated for production domain

## 🔧 Environment Variables

Set these in your deployment platform:

```bash
NODE_ENV=production
PORT=3001  # or platform-specific port
```

## 🏗️ Build Process

The deployment will run:
1. `pnpm install` - Install dependencies
2. `pnpm run build` - Compile TypeScript
3. `pnpm start` - Start production server

## 📖 API Documentation

After deployment, your API docs will be available at:
- `https://your-domain.com/docs` - Interactive API documentation
- `https://your-domain.com/openapi.json` - OpenAPI specification

## 🔍 Health Check

- `https://your-domain.com/` - Health check endpoint

## 🆘 Troubleshooting

**Build fails:**
- Check TypeScript compilation: `pnpm run build`
- Verify all dependencies in package.json

**App won't start:**
- Check port configuration
- Verify environment variables
- Review logs in platform dashboard

**CORS issues:**
- Update CORS settings in `src/middleware/cors.ts`
- Add your production domain to allowed origins