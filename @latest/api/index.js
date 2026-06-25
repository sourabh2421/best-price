import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { randomBytes } from 'crypto'

const app = express()

// CORS Configuration
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

// Admin credentials from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bestprice2024'
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString('hex')

// Auth middleware
const requireAuth = (req, res, next) => {
  const session = req.cookies.admin_session
  if (session === SESSION_SECRET) {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// In-memory storage (temporary - will need database for production)
let products = []

// ============= ROUTES =============

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Best Price API Server',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      login: '/api/admin/login',
      check: '/api/admin/check'
    }
  })
})

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  
  if (password === ADMIN_PASSWORD) {
    res.cookie('admin_session', SESSION_SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
    return res.json({ success: true })
  } else {
    return res.status(401).json({ error: 'Invalid password' })
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

// FILE UPLOAD DISABLED — Vercel serverless has read-only filesystem
// To enable uploads, integrate Cloudinary or database storage
app.post('/api/admin/upload', requireAuth, (req, res) => {
  res.status(503).json({ 
    error: 'File uploads not available on serverless deployment',
    message: 'Please contact developer to integrate Cloudinary or database storage'
  })
})

// Delete product
app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' })
  }

  products.splice(productIndex, 1)
  res.json({ success: true })
})

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    path: req.path,
    message: 'This endpoint does not exist'
  })
})

// Export for Vercel serverless
export default app
