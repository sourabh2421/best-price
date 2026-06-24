# System Flow Diagrams

## 🔐 Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. Navigate to /admin
       ▼
┌─────────────────┐
│  AdminPage.jsx  │
└────────┬────────┘
         │
         │ 2. Check auth status
         ▼
┌──────────────────────┐
│ GET /api/admin/check │
└──────────┬───────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
[Cookie?]      [No Cookie]
    │             │
    │             ▼
    │      ┌──────────────┐
    │      │ AdminLogin   │
    │      └──────┬───────┘
    │             │
    │             │ 3. Submit password
    │             ▼
    │      ┌────────────────────┐
    │      │ POST /admin/login  │
    │      └──────┬─────────────┘
    │             │
    │             │ 4. Password check
    │             ▼
    │      ┌──────────────┐
    │      │ Set Cookie   │
    │      └──────┬───────┘
    │             │
    └─────────────┘
                  │
                  ▼
          ┌──────────────────┐
          │ AdminDashboard   │
          └──────────────────┘
```

---

## 📤 Upload Flow

```
┌─────────────────┐
│ AdminDashboard  │
└────────┬────────┘
         │
         │ 1. User selects files
         ▼
┌─────────────────┐
│ File Input      │
│ (multiple)      │
└────────┬────────┘
         │
         │ 2. Create previews
         ▼
┌─────────────────┐
│ Object URLs     │
│ Display Grid    │
└────────┬────────┘
         │
         │ 3. User clicks Upload
         ▼
┌─────────────────┐
│ FormData        │
│ + Cookie Auth   │
└────────┬────────┘
         │
         │ 4. POST /api/admin/upload
         ▼
┌─────────────────────────┐
│   Express Backend       │
│                         │
│  ┌─────────────────┐   │
│  │ Multer Validate │   │
│  └────────┬────────┘   │
│           │             │
│           ▼             │
│  ┌─────────────────┐   │
│  │ Sharp Process   │   │
│  │ • Resize 800x800│   │
│  │ • Add bg #F7F7F5│   │
│  │ • Sharpen       │   │
│  │ • Normalize     │   │
│  │ • Convert WebP  │   │
│  └────────┬────────┘   │
│           │             │
│           ▼             │
│  ┌─────────────────┐   │
│  │ Save to         │   │
│  │ /public/products│   │
│  └────────┬────────┘   │
│           │             │
│           ▼             │
│  ┌─────────────────┐   │
│  │ Update          │   │
│  │ products.json   │   │
│  └────────┬────────┘   │
│           │             │
└───────────┼─────────────┘
            │
            │ 5. Return success
            ▼
    ┌───────────────┐
    │ Refresh List  │
    │ Clear Preview │
    └───────────────┘
```

---

## 🗑️ Delete Flow

```
┌─────────────────┐
│ AdminDashboard  │
│                 │
│ Product Grid    │
└────────┬────────┘
         │
         │ 1. User hovers
         ▼
┌─────────────────┐
│ Show Delete Btn │
└────────┬────────┘
         │
         │ 2. User clicks
         ▼
┌─────────────────┐
│ Confirm Dialog  │
└────────┬────────┘
         │
         │ 3. User confirms
         ▼
┌──────────────────────────┐
│ DELETE /admin/products/:id│
│ + Cookie Auth            │
└──────────┬───────────────┘
           │
           ▼
┌───────────────────────────┐
│   Express Backend         │
│                           │
│  ┌─────────────────────┐ │
│  │ Find product by ID  │ │
│  └──────────┬──────────┘ │
│             │             │
│             ▼             │
│  ┌─────────────────────┐ │
│  │ Delete file from    │ │
│  │ /public/products/   │ │
│  └──────────┬──────────┘ │
│             │             │
│             ▼             │
│  ┌─────────────────────┐ │
│  │ Remove from         │ │
│  │ products.json       │ │
│  └──────────┬──────────┘ │
│             │             │
└─────────────┼─────────────┘
              │
              │ 4. Return success
              ▼
      ┌───────────────┐
      │ Refresh List  │
      └───────────────┘
```

---

## 🛍️ Public Shop Display Flow

```
┌─────────────┐
│  HomePage   │
└──────┬──────┘
       │
       │ 1. Component loads
       ▼
┌─────────────┐
│  Shop.jsx   │
└──────┬──────┘
       │
       │ 2. Fetch products
       ▼
┌─────────────────┐
│ GET /api/products│
└──────┬──────────┘
       │
       ▼
┌──────────────────┐
│ Read products.json│
└──────┬───────────┘
       │
       │ 3. Return JSON array
       ▼
┌─────────────────┐
│  Shop.jsx       │
│  (state update) │
└──────┬──────────┘
       │
       │ 4. Map products
       ▼
┌─────────────────────────┐
│  Framer Motion Grid     │
│                         │
│  ┌──────┐  ┌──────┐    │
│  │ Card │  │ Card │    │
│  │      │  │      │    │
│  │ [IMG]│  │ [IMG]│    │
│  │ Name │  │ Name │    │
│  └──────┘  └──────┘    │
│                         │
│  Images loaded from:    │
│  /products/{filename}   │
└─────────────────────────┘
       │
       │ 5. Animate on scroll
       ▼
┌─────────────────┐
│ Stagger fade-up │
│ Hover effects   │
└─────────────────┘
```

---

## 🗂️ Data Storage Structure

```
File System
└── /Users/jarvis/best-price/@latest/
    ├── .env
    │   └── ADMIN_PASSWORD=bestprice2024
    │
    ├── data/
    │   └── products.json
    │       └── [
    │             {
    │               "id": "abc123",
    │               "filename": "abc123.webp",
    │               "name": "",
    │               "uploadedAt": "2024-06-21T..."
    │             }
    │           ]
    │
    └── public/
        └── products/
            ├── abc123.webp  (800x800)
            ├── def456.webp  (800x800)
            └── ghi789.webp  (800x800)
```

---

## 🔄 Request/Response Flow

### Upload Request
```
Frontend                        Backend
   │                               │
   ├─ FormData ───────────────────>│
   │  • images[]                   │
   │  • Cookie: admin_session      │
   │                               │
   │                               ├─ Validate Cookie
   │                               ├─ Check MIME types
   │                               ├─ Process with Sharp
   │                               ├─ Save files
   │                               ├─ Update JSON
   │                               │
   │<──────────────── Response ────┤
   │  {                            │
   │    success: true,             │
   │    products: [...]            │
   │  }                            │
   │                               │
```

### Product Fetch Request
```
Frontend                        Backend
   │                               │
   ├─ GET /api/products ──────────>│
   │                               │
   │                               ├─ Read products.json
   │                               │
   │<──────────────── Response ────┤
   │  [                            │
   │    {                          │
   │      id, filename,            │
   │      name, uploadedAt         │
   │    }                          │
   │  ]                            │
   │                               │
```

---

## 🎨 Component Hierarchy

```
App.jsx
├── BrowserRouter
    └── Routes
        ├── / → HomePage
        │        ├── Navbar (with Shop link)
        │        ├── Hero
        │        ├── About
        │        ├── Services
        │        ├── Products
        │        ├── Shop ★ NEW
        │        │   └── Fetches from /api/products
        │        ├── Reviews
        │        ├── Contact
        │        └── Footer
        │
        └── /admin → AdminPage ★ NEW
                     ├── Check auth
                     ├── AdminLogin (if not auth)
                     │   └── Password form
                     └── AdminDashboard (if auth)
                         ├── Upload section
                         │   ├── File input
                         │   ├── Preview grid
                         │   └── Upload button
                         └── Products list
                             └── Delete buttons
```

---

## 🌐 Server Architecture

```
server.js (Express)
│
├── Middleware
│   ├── CORS (localhost:5173)
│   ├── JSON parser
│   ├── Cookie parser
│   └── Static files (/products)
│
├── Auth Middleware
│   └── requireAuth()
│       └── Check admin_session cookie
│
├── Routes
│   │
│   ├── Public
│   │   ├── GET  /api/products
│   │   └── GET  /products/:filename
│   │
│   └── Admin (protected)
│       ├── POST   /api/admin/login
│       ├── GET    /api/admin/check
│       ├── POST   /api/admin/logout
│       ├── POST   /api/admin/upload
│       └── DELETE /api/admin/products/:id
│
└── File Operations
    ├── Read products.json
    ├── Write products.json
    ├── Delete product files
    └── Save uploaded files
```

---

## 📊 Image Processing Pipeline

```
Upload File
    │
    ├── Multer
    │   ├── Validate MIME type
    │   ├── Check file size < 10MB
    │   └── Store in memory buffer
    │
    ├── Sharp
    │   │
    │   ├── Load buffer
    │   │   └── Read metadata
    │   │
    │   ├── Resize
    │   │   ├── Target: 800x800
    │   │   ├── Fit: contain
    │   │   └── Background: #F7F7F5
    │   │
    │   ├── Enhance
    │   │   ├── Sharpen edges
    │   │   └── Normalize levels
    │   │
    │   └── Convert
    │       ├── Format: WebP
    │       ├── Quality: 85
    │       └── Output: Buffer
    │
    └── Save
        ├── Filename: {randomId}.webp
        ├── Path: /public/products/
        └── Metadata: products.json
```

---

Visual representations make the system easier to understand! 📊
