# Deployment Issue Summary - Admin Dashboard Backend

## Current Situation

I have a React + Express fullstack application with:
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js API with admin authentication and file upload
- **Repository**: Single GitHub repo with both frontend and backend code

### What's Working:
- ✅ Frontend deployed successfully on Vercel: `https://best-price-seven.vercel.app`
- ✅ Frontend routing works (/, /shop, /admin pages load correctly)
- ✅ Local development works perfectly (both frontend and backend)

### What's NOT Working:
- ❌ Backend API deployed as separate Vercel project `https://best-price-api-mu.vercel.app` returns 404 errors
- ❌ Admin login fails with "Connection error" because frontend can't reach backend
- ❌ Products API endpoint returns 404
- ❌ CORS issues between frontend and backend

## Project Structure

```
@latest/
├── api/
│   └── [...all].js          # Express app exported for Vercel serverless
├── src/
│   ├── components/
│   │   ├── Shop.jsx         # Uses API_URL from config
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       └── AdminDashboard.jsx
│   ├── pages/
│   │   └── ShopPage.jsx
│   └── config.js            # exports API_URL
├── public/
├── server.js                # Original Express server (works locally)
├── vercel.json              # Frontend config (rewrites for React Router)
├── vercel-api.json          # Backend config (not being used)
├── .env.production          # VITE_API_URL=https://best-price-api-mu.vercel.app
└── package.json
```

## What I've Tried

1. **Deployed backend as separate Vercel project** from same repo
   - Created `vercel.json` with routes to `server.js`
   - Result: 404 errors on all endpoints

2. **Created `/api` folder with serverless functions**
   - Moved Express app to `api/index.js`
   - Tried `api/[...all].js` catch-all route
   - Result: Still 404 errors

3. **CORS Configuration**
   ```javascript
   const allowedOrigins = [
     'http://localhost:5173',
     'https://best-price-seven.vercel.app',
   ]
   ```

4. **Updated all API calls to use environment variable**
   ```javascript
   export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
   ```

## Current Backend Code (api/[...all].js)

```javascript
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true 
}))

app.use(express.json())
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Best Price API', status: 'running' })
})

app.post('/api/admin/login', (req, res) => { /* ... */ })
app.get('/api/products', (req, res) => { /* ... */ })

export default app
```

## Expected URLs

- Frontend: `https://best-price-seven.vercel.app` ✅ WORKS
- Backend API: `https://best-price-api-mu.vercel.app/api/products` ❌ 404
- Admin Login: `https://best-price-api-mu.vercel.app/api/admin/login` ❌ 404

## Error Messages

1. **Frontend Console**:
   ```
   Connection error. Make sure the server is running.
   Failed to load resource: the server responded with a status of 404
   Origin https://best-price-seven.vercel.app is not allowed by Access-Control-Allow-Origin
   ```

2. **Backend URLs**:
   - `https://best-price-api-mu.vercel.app/` → 404: NOT_FOUND
   - `https://best-price-api-mu.vercel.app/api/products` → 404: NOT_FOUND

## Questions

1. **How do I properly deploy an Express API to Vercel from a repo that also contains a React frontend?**
   - Should I use separate projects or combine them?
   - What's the correct `vercel.json` configuration?

2. **Why are my API routes returning 404?**
   - Is the Express app not being recognized as a serverless function?
   - Do I need different file naming (`api/index.js` vs `api/[...all].js`)?

3. **How do I handle CORS between two Vercel projects?**
   - Are there special settings needed?
   - Should `sameSite` be `'none'` for cross-origin cookies?

4. **File Upload Limitation**:
   - I know Vercel serverless can't store files permanently
   - For now, I just need login/authentication to work
   - File upload can be disabled temporarily

## What I Need

A working backend deployment where:
1. `https://best-price-api-mu.vercel.app/api/products` returns `[]` (empty array)
2. `https://best-price-api-mu.vercel.app/api/admin/login` accepts POST requests
3. CORS allows requests from `https://best-price-seven.vercel.app`
4. Frontend can successfully login to admin dashboard

## Additional Context

- Both projects are on Vercel free tier
- GitHub auto-deployment is enabled for frontend
- Backend is manually deployed/redeployed through Vercel dashboard
- Environment variables are set:
  - Frontend: `VITE_API_URL=https://best-price-api-mu.vercel.app`
  - Backend: `ADMIN_PASSWORD=bestprice2024`, `NODE_ENV=production`, `SESSION_SECRET=[random]`

---

**Please help me fix the backend deployment so the admin dashboard can connect successfully!**
