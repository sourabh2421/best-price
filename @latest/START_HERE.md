# 🚀 Quick Start Guide

## Start the Admin System

### Single Command (Recommended)
```bash
npm run dev:all
```

This starts both:
- ✅ Frontend (React) on http://localhost:5173
- ✅ Backend (Express) on http://localhost:3001

---

## Access Points

| What | URL |
|------|-----|
| **Main Website** | http://localhost:5173 |
| **Admin Panel** | http://localhost:5173/admin |
| **Admin Password** | `bestprice2024` |

---

## First Time Setup ✓

Everything is already configured! Just run:
```bash
npm run dev:all
```

---

## What You Can Do

### 1. Login to Admin
1. Visit: http://localhost:5173/admin
2. Password: `bestprice2024`
3. Click "Login"

### 2. Upload Products
1. Click "Click to select images"
2. Choose multiple phone case photos
3. See thumbnail previews
4. Click "Upload Images"
5. Wait for processing (auto 800x800, WebP conversion)

### 3. Manage Products
- View all uploaded products in grid
- Hover over image → see delete button
- Click trash icon to remove

### 4. View Public Shop
- Visit homepage: http://localhost:5173
- Scroll to "Shop" section (after Products section)
- See your uploaded products in beautiful grid
- Matches your blue/orange design perfectly!

---

## File Locations

- **Uploaded Images**: `/public/products/`
- **Product Data**: `/data/products.json`
- **Environment**: `/.env`

---

## Change Admin Password

Edit `.env` file:
```env
ADMIN_PASSWORD=your_new_password
```

Then restart servers.

---

## Stop Servers

Press `Ctrl + C` in the terminal running `npm run dev:all`

---

## Need Help?

Read full documentation: `ADMIN_SETUP.md`

---

That's it! You're ready to manage products. 🎉
