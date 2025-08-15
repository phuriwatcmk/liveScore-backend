# Deployment Guide

## Deploy to Vercel

### Quick Deploy

1. **Install Vercel CLI**:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Deploy**:
   \`\`\`bash
   vercel
   \`\`\`

3. **Follow the prompts**:
   - Link to existing project? **N**
   - Project name: **livescore-backend** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **N**

### Manual Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will automatically detect the settings from `vercel.json`

### Environment Setup

The project works out of the box with mock data. For production:

1. Replace mock data with real API calls
2. Add environment variables for API keys
3. Configure CORS origins for your frontend domain

### Testing the Deployment

Once deployed, test these endpoints:

- `GET /` - API info
- `GET /api/health` - Health check
- `GET /api/match/1` - Sample match data
- `GET /api/news` - Sample news data

Your API will be available at: `https://your-project-name.vercel.app`