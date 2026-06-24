import express from 'express'
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
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true 
}))
app.use(express.json())
app.use(cookieParser())

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

// In-memory storage (temporary - needs database)
let products = []

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Best Price API',
    status: 'running',
    endpoints: ['/api/products', '/api/admin/login']
  })
})

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  if (password === ADMIN_PASSWORD) {
    res.cookie('admin_session', SESSION_SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
})

app.get('/api/admin/check', requireAuth, (req, res) => {
  res.json({ authenticated: true })
})

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_session')
  res.json({ success: true })
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

// Catch all
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path })
})

export default app
