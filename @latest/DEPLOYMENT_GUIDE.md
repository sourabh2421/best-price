# Deployment Guide - Admin Dashboard & Backend API

## Overview
Your app has **two separate parts** that need deployment:
1. **Frontend (React)** - Already deployed on Vercel ✅
2. **Backend (Express API + Admin)** - Needs to be deployed separately

---

## 🚀 Deploy Backend to Vercel

Since your main frontend is already on Vercel, you'll deploy the backend API as a **separate Vercel project**.

### Step 1: Prepare Backend for Deployment

#### 1.1 Update CORS Configuration
Edit `server.js` to allow your production frontend URL:

```javascript
// Change this line:
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// To this (replace with your actual Vercel frontend URL):
const allowedOrigins = [
  'http://localhost:5173', // for local development
  'https://your-frontend-app.vercel.app', // your production URL
  'https://your-custom-domain.com' // if you have a custom domain
]

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true 
}))
```

#### 1.2 Create `vercel.json` for Backend
Create a new file `vercel.json` in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/products/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 1.3 Update `package.json` Scripts
Add a start script for production:

```json
{
  "scripts": {
    "dev": "vite",
    "server": "node server.js",
    "start": "node server.js",  // Add this line
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

---

### Step 2: Deploy Backend to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy the backend**:
```bash
cd /Users/jarvis/best-price/@latest
vercel --prod
```

4. **Follow prompts**:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No (create new)
   - Project name: `best-price-api` (or any name)
   - Directory: `./` (current directory)
   - Want to override settings: No

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New Project"**
3. Import your Git repository (push code to GitHub first if not already)
4. **Important Settings**:
   - **Project Name**: `best-price-api` (or any name)
   - **Root Directory**: Leave as `./`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty or use `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

---

### Step 3: Configure Environment Variables

In Vercel Dashboard for the backend project:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following:
   - `ADMIN_PASSWORD` = `bestprice2024`
   - `NODE_ENV` = `production`
   - `SESSION_SECRET` = `[generate-random-32-char-string]`

To generate SESSION_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 4: Update Frontend to Use Backend API

Update all API calls in your frontend code to use the deployed backend URL.

#### 4.1 Create Environment Variable for Frontend

Create `.env.production` in your frontend project:
```
VITE_API_URL=https://your-backend-api.vercel.app
```

#### 4.2 Update API Calls

Find and replace all instances of `http://localhost:3001` in your code:

**Files to update:**
- `src/components/Shop.jsx`
- `src/pages/ShopPage.jsx`
- `src/components/admin/AdminDashboard.jsx`
- `src/components/admin/AdminLogin.jsx`

**Example change:**
```javascript
// Before:
const response = await fetch('http://localhost:3001/api/products')

// After:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const response = await fetch(`${API_URL}/api/products`)
```

Or create a config file `src/config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
```

Then import and use:
```javascript
import { API_URL } from '../config'
const response = await fetch(`${API_URL}/api/products`)
```

#### 4.3 Redeploy Frontend
After updating API URLs, redeploy your frontend:
```bash
git add .
git commit -m "Update API URLs for production"
git push origin main
```
(Vercel will auto-deploy if connected to Git)

---

## 📝 Important Notes

### File Storage Issue ⚠️
**Vercel has read-only filesystem** - uploaded images will be lost on each deployment!

### Solutions:

#### Option 1: Use Vercel Blob Storage (Recommended)
```bash
npm install @vercel/blob
```

Update server.js to use Vercel Blob instead of local filesystem.

#### Option 2: Use Cloudinary (Easier)
```bash
npm install cloudinary
```

Update upload endpoint to upload to Cloudinary.

#### Option 3: Use AWS S3
Upload images to S3 bucket instead of local storage.

---

## 🔗 Final URLs

After deployment, you'll have:

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend-api.vercel.app`
- **Admin Dashboard**: `https://your-frontend.vercel.app/admin`

---

## ✅ Testing Deployment

1. Visit `https://your-frontend.vercel.app`
2. Click "Shop Now" - should load products
3. Go to `https://your-frontend.vercel.app/admin`
4. Login with password: `bestprice2024`
5. Try uploading a product

---

## 🐛 Troubleshooting

### CORS Errors
- Make sure backend CORS allows your frontend URL
- Check browser console for exact error

### API Not Found (404)
- Verify `vercel.json` routes are correct
- Check Vercel function logs in dashboard

### Upload Not Working
- Check Vercel function timeout (10 seconds default, 60 max on Pro)
- Check file size limits
- Consider using Cloudinary/S3 for storage

### Products Not Persisting
- Vercel filesystem is read-only
- Must use external storage (Blob, Cloudinary, S3)

---

## 📞 Share Admin Access

To share admin dashboard with shop owner:

**URL**: `https://your-frontend.vercel.app/admin`  
**Password**: `bestprice2024`

**Instructions for Owner**:
1. Visit the admin URL
2. Enter password
3. Click to upload images
4. Fill in product name and price
5. Click "Upload Products"
6. Products appear on main shop page immediately

---

## 🔐 Security Recommendations

1. **Change Default Password**: Update `ADMIN_PASSWORD` in Vercel environment variables
2. **Use Strong SESSION_SECRET**: Generate new random 32-char string
3. **Enable 2FA**: On your Vercel account
4. **Restrict Admin IPs**: Add IP whitelist if possible
5. **Monitor Logs**: Check Vercel function logs regularly

---

## 💡 Alternative Approach: Combined Deployment

If you want everything in one project:

1. Keep backend in `api/` folder
2. Vercel treats `/api` folder as serverless functions automatically
3. Frontend serves from root
4. No separate backend deployment needed

But this requires restructuring your current setup.
