# Admin Product Management System

## 🚀 Quick Start

### 1. Install Dependencies
Already done! If you need to reinstall:
```bash
npm install
```

### 2. Start Both Servers
Run both the frontend and backend together:
```bash
npm run dev:all
```

Or run them separately in two terminals:

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

### 3. Access the System

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Backend API**: http://localhost:3001

---

## 🔐 Admin Access

**Default Password**: `bestprice2024`

Change it in `.env`:
```env
ADMIN_PASSWORD=your_secure_password_here
```

---

## 📁 Project Structure

```
best-price/@latest/
├── server.js                    # Express backend server
├── .env                         # Environment variables (password)
├── data/
│   └── products.json           # Product metadata storage
├── public/
│   └── products/               # Uploaded product images (auto-created)
└── src/
    ├── components/
    │   ├── Shop.jsx            # Public product showcase
    │   └── admin/
    │       ├── AdminLogin.jsx  # Admin login form
    │       └── AdminDashboard.jsx # Upload & manage products
    └── pages/
        └── AdminPage.jsx       # Admin route handler
```

---

## 🎯 Features

### Admin Panel (`/admin`)
✅ Password-protected access
✅ Drag & drop multi-file upload
✅ Image preview before upload
✅ Automatic 800x800 square cropping
✅ WebP conversion for optimization
✅ Product list with delete functionality
✅ No database required (JSON storage)

### Public Shop Section (Homepage)
✅ Automatic product grid display
✅ Responsive: 2 cols mobile → 4 cols desktop
✅ Smooth animations on scroll
✅ Hover effects (scale + shadow)
✅ Matches existing site design
✅ Hidden when no products exist

---

## 🔧 API Endpoints

### Public
- `GET /api/products` - Get all products
- `GET /products/:filename` - Serve product images

### Admin (requires authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/check` - Check auth status
- `POST /api/admin/logout` - Logout
- `POST /api/admin/upload` - Upload images
- `DELETE /api/admin/products/:id` - Delete product

---

## 📸 Image Processing

Uploaded images are automatically:
1. ✅ Resized to 800x800 pixels
2. ✅ Cropped to square with contain fit
3. ✅ Placed on #F7F7F5 background (matches site)
4. ✅ Sharpened and normalized
5. ✅ Converted to WebP format
6. ✅ Saved with unique filename

---

## 🎨 Design Integration

The Shop section matches your existing site:
- ✅ Royal Blue (#2563EB) and Orange (#F97316) color scheme
- ✅ Sora font for headings
- ✅ Same spacing and whitespace
- ✅ Consistent card shadows and borders
- ✅ Framer Motion animations
- ✅ Responsive grid layout

---

## 🔒 Security

- HttpOnly cookies for session management
- CORS enabled only for localhost:5173
- Password stored in environment variable
- No localStorage/sessionStorage usage
- File type validation (jpg, png, webp only)
- 10MB file size limit

---

## 📝 Usage Workflow

1. **Start servers**: `npm run dev:all`
2. **Login**: Visit http://localhost:5173/admin
3. **Upload**: 
   - Click to select images
   - Preview thumbnails
   - Click "Upload Images"
4. **Manage**: 
   - View all products
   - Hover to see delete button
   - Click trash icon to remove
5. **View**: 
   - Products appear automatically on homepage
   - Shop section shows between Products and Reviews

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3001 is in use
lsof -ti:3001 | xargs kill -9

# Restart server
npm run server
```

### Can't login
- Check `.env` file exists
- Verify ADMIN_PASSWORD is set
- Clear browser cookies
- Try in incognito mode

### Images not showing
- Ensure server is running on port 3001
- Check `public/products/` directory exists
- Verify CORS settings in server.js

### Upload fails
- Check file types (only jpg, png, webp)
- Ensure file size < 10MB
- Check server console for errors
- Verify disk space available

---

## 🚀 Deployment Notes

### Environment Variables
Set these in production:
```env
ADMIN_PASSWORD=your_secure_production_password
NODE_ENV=production
PORT=3001
```

### Build Steps
1. Build frontend: `npm run build`
2. Serve static files from `dist/`
3. Run backend: `node server.js`
4. Update CORS origin in `server.js` to your domain

### File Storage
- `data/products.json` - Commit to git or backup regularly
- `public/products/` - Backup images or use cloud storage

---

## ✅ All Requirements Met

✅ Single password authentication (no DB)
✅ HttpOnly cookie sessions
✅ /admin route with login gate
✅ Drag-drop multi-file upload
✅ Thumbnail preview before submit
✅ Sharp image processing (800x800, background, sharpen)
✅ Save to /public/products/
✅ Metadata in /data/products.json
✅ Delete functionality
✅ Public showcase grid (2/3/4 cols responsive)
✅ Matches existing site design exactly
✅ No glassmorphism or purple gradients
✅ Only new dependency: sharp (+ supporting packages)
✅ No localStorage/sessionStorage
✅ Clean, functional admin UI

---

## 📦 Dependencies Added

- `express` - Backend server
- `multer` - File upload handling
- `sharp` - Image processing
- `cookie-parser` - Cookie management
- `dotenv` - Environment variables
- `cors` - Cross-origin requests
- `concurrently` - Run dev servers together

---

Your admin product management system is ready! 🎉
