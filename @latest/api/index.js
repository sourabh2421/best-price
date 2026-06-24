import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { randomBytes } from 'crypto'

const app = express()

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://best-price-seven.vercel.app',
]

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('Blocked by CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true 
}))
app.use(express.json())
app.use(cookieParser())

// Multer setup for file uploads (memory storage only for Vercel)
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.'))
    }
  },
})

// Admin password from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bestprice2024'
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString('hex')

// Middleware to check admin session
const requireAuth = (req, res, next) => {
  const session = req.cookies.admin_session
  if (session === SESSION_SECRET) {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// In-memory storage for now (will be replaced with database)
let products = []

// Routes

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Best Price API Server',
    status: 'running',
    note: 'File uploads are disabled on serverless. Use Cloudinary or database.',
    endpoints: {
      products: '/api/products',
      admin_login: '/api/admin/login',
    }
  })
})

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.cookie('admin_session', SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

// Check auth status
app.get('/api/admin/check', requireAuth, (req, res) => {
  res.json({ authenticated: true })
})

// Logout
app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_session')
  res.json({ success: true })
})

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products)
})

// Upload products (temporarily disabled - requires database)
app.post('/api/admin/upload', requireAuth, upload.array('images', 20), async (req, res) => {
  try {
    res.status(503).json({ 
      error: 'File upload not available on serverless. Please use Cloudinary or database storage.',
      message: 'Contact developer to set up proper storage solution.'
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Delete product
app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    products.splice(productIndex, 1)
    res.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Export for Vercel serverless
export default app
