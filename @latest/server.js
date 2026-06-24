import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { randomBytes } from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // for local development
  'https://best-price-seven.vercel.app', // production URL
]

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
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
app.use('/products', express.static(join(__dirname, 'public', 'products')))

// Ensure directories exist
const productsDir = join(__dirname, 'public', 'products')
const dataDir = join(__dirname, 'data')
const productsJsonPath = join(dataDir, 'products.json')

if (!existsSync(productsDir)) {
  mkdirSync(productsDir, { recursive: true })
}

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

if (!existsSync(productsJsonPath)) {
  writeFileSync(productsJsonPath, JSON.stringify([], null, 2))
}

// Multer setup for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
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
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
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

// Helper functions
const readProducts = () => {
  try {
    const data = readFileSync(productsJsonPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

const writeProducts = (products) => {
  writeFileSync(productsJsonPath, JSON.stringify(products, null, 2))
}

// Routes

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Best Price API Server',
    status: 'running',
    endpoints: {
      products: '/api/products',
      admin_login: '/api/admin/login',
      admin_upload: '/api/admin/upload',
      admin_delete: '/api/admin/products/:id'
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
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
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

// Upload products
app.post('/api/admin/upload', requireAuth, upload.array('images', 20), async (req, res) => {
  try {
    const products = readProducts()
    const uploadedProducts = []
    
    console.log('Raw body:', req.body.productDetails)
    const productDetails = JSON.parse(req.body.productDetails || '[]')
    console.log('Parsed details:', productDetails)

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i]
      const id = randomBytes(8).toString('hex')
      const filename = `${id}.webp`
      const filepath = join(productsDir, filename)

      // Process image with sharp
      const image = sharp(file.buffer)
      
      // Create 800x800 square image with background
      await image
        .resize(800, 800, {
          fit: 'contain',
          background: '#F7F7F5',
        })
        .sharpen()
        .normalize()
        .webp({ quality: 85 })
        .toFile(filepath)

      const detail = productDetails[i] || {}
      console.log(`Product ${i} detail:`, detail)
      
      const product = {
        id,
        filename,
        name: detail.name || '',
        price: detail.price || '',
        uploadedAt: new Date().toISOString(),
      }
      
      console.log(`Saving product:`, product)

      products.push(product)
      uploadedProducts.push(product)
    }

    writeProducts(products)
    res.json({ success: true, products: uploadedProducts })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get all products
app.get('/api/products', (req, res) => {
  const products = readProducts()
  res.json(products)
})

// Delete product
app.delete('/api/admin/products/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params
    const products = readProducts()
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const product = products[productIndex]
    const filepath = join(productsDir, product.filename)

    // Delete file if exists
    if (existsSync(filepath)) {
      unlinkSync(filepath)
    }

    // Remove from JSON
    products.splice(productIndex, 1)
    writeProducts(products)

    res.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📦 Products directory: ${productsDir}`)
  console.log(`🔐 Admin password: ${ADMIN_PASSWORD}`)
})
