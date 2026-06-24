# Quick Reference Card

## 🚀 Commands

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Start both frontend & backend |
| `npm run dev` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run build` | Build for production |

---

## 🌐 URLs

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Main website |
| http://localhost:5173/admin | Admin panel |
| http://localhost:3001 | Backend API |

---

## 🔐 Credentials

| Item | Value |
|------|-------|
| Admin Password | `bestprice2024` |
| Password Location | `.env` file |
| Change Password | Edit `ADMIN_PASSWORD` in `.env` |

---

## 📁 Important Paths

| Path | Contains |
|------|----------|
| `/data/products.json` | Product metadata |
| `/public/products/` | Uploaded images (800x800) |
| `/.env` | Admin password config |
| `/server.js` | Backend server code |

---

## 🔌 API Endpoints

### Public (No Auth)
```
GET  /api/products            → Get all products
GET  /products/:filename      → Get image file
```

### Admin (Auth Required)
```
POST   /api/admin/login       → Login with password
GET    /api/admin/check       → Check if logged in
POST   /api/admin/logout      → Logout
POST   /api/admin/upload      → Upload images
DELETE /api/admin/products/:id → Delete product
```

---

## 📤 Upload Specs

| Property | Value |
|----------|-------|
| **Max File Size** | 10MB |
| **Allowed Types** | JPG, PNG, WEBP |
| **Output Size** | 800x800 pixels |
| **Output Format** | WebP (quality 85) |
| **Background** | #F7F7F5 |
| **Processing** | Resize, sharpen, normalize |

---

## 🎨 Design Tokens

| Element | Value |
|---------|-------|
| **Primary Color** | #2563EB (Royal Blue) |
| **Accent Color** | #F97316 (Sunset Orange) |
| **Success Color** | #10B981 (Emerald) |
| **Background** | #FAFAFA (Off-white) |
| **Display Font** | Sora |
| **Body Font** | Inter |

---

## 📱 Grid Breakpoints

| Screen | Columns |
|--------|---------|
| **Mobile** (< 640px) | 2 columns |
| **Tablet** (640-1024px) | 3 columns |
| **Desktop** (> 1024px) | 4 columns |

---

## 🔒 Security Checklist

- [x] Password in environment variable
- [x] HttpOnly cookies
- [x] CORS restrictions
- [x] File type validation
- [x] Size limits
- [x] No client-side storage

---

## 📋 Workflow

### Upload Products
1. Start: `npm run dev:all`
2. Login: http://localhost:5173/admin
3. Select images (drag & drop)
4. Preview thumbnails
5. Click "Upload Images"
6. Wait for processing
7. Done! ✅

### View Products
1. Visit homepage
2. Scroll to "Shop" section
3. See all uploaded products
4. Responsive grid with animations

### Delete Products
1. Login to admin
2. Hover over product
3. Click trash icon
4. Confirm deletion
5. Product removed

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| **Port 3001 in use** | `lsof -ti:3001 \| xargs kill -9` |
| **Can't login** | Check `.env` file, clear cookies |
| **Upload fails** | Check file type/size, server logs |
| **Images not loading** | Ensure server running, check paths |
| **Build errors** | Run `npm install` |

---

## 📚 Documentation

| File | When to Read |
|------|--------------|
| **START_HERE.md** | First time setup |
| **ADMIN_SETUP.md** | Detailed usage guide |
| **PRODUCT_ADMIN_SYSTEM.md** | Full technical docs |
| **SYSTEM_FLOW.md** | Understanding architecture |
| **README_ADMIN.md** | Overview & summary |
| This file | Quick lookups |

---

## ✅ Pre-Flight Checklist

Before starting:
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file exists
- [ ] Port 3001 available
- [ ] Port 5173 available

---

## 🎯 Quick Troubleshooting

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Kill stuck processes
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Check if servers running
lsof -i:3001
lsof -i:5173

# View server logs
npm run server

# Test API
curl http://localhost:3001/api/products
```

---

## 📞 Support

If you need help:
1. Check error messages in terminal
2. Review documentation files
3. Check browser console
4. Verify file paths
5. Test with simple case (1 small image)

---

## 🎉 That's It!

Everything you need on one page. Bookmark this for quick reference!

**To start working:**
```bash
npm run dev:all
```

**Then visit:**
http://localhost:5173/admin

Happy uploading! 🚀
