import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiShoppingCart, HiPlus, HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import logo from '../assets/logo.webp'
import Footer from '../components/Footer'
import CartModal from '../components/CartModal'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import ScrollToTopButton from '../components/ScrollToTopButton'

function ShopPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedProductId, setAddedProductId] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetchProducts()
    loadCart()
  }, [])

  useEffect(() => {
    saveCart()
  }, [cart])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCart = () => {
    const saved = sessionStorage.getItem('cart')
    if (saved) {
      setCart(JSON.parse(saved))
    }
  }

  const saveCart = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    
    // Trigger animation
    setAddedProductId(product.id)
    setTimeout(() => setAddedProductId(null), 800)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Shop Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-navbar border-b border-slate-200/60 shadow-sm'
            : 'bg-white/95 backdrop-blur'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex cursor-pointer items-center gap-3">
            <img
              src={logo}
              alt="Best Price Mobile Accessories"
              className="h-11 rounded-lg bg-white p-1 object-contain shadow-sm transition-transform duration-300 hover:scale-105 md:h-14"
              loading="eager"
            />
            <span className="hidden font-display text-xl font-bold text-slate-900 sm:block md:text-2xl">
              Best Price
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 md:px-5 md:py-2.5"
            >
              <HiHome size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <span className="font-display text-lg font-semibold text-primary-600">
              Shop
            </span>
          </nav>
        </div>
      </header>
      
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
                Our Shop
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-blue-50 md:text-xl">
                Browse our collection of premium mobile accessories at unbeatable prices
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
                <p className="mt-4 text-slate-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <p className="text-slate-500">No products available yet. Check back soon!</p>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={item}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="aspect-square overflow-hidden bg-slate-50">
                      <img
                        src={`${API_URL}/products/${product.filename}`}
                        alt={product.name || 'Product'}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-sm font-medium text-slate-800">
                        {product.name || 'Product'}
                      </h3>
                      <p className="mt-1 text-lg font-bold text-primary-600">
                        {product.price && product.price !== '' ? `₹${product.price}` : 'Contact for price'}
                      </p>
                      <motion.button
                        onClick={() => addToCart(product)}
                        disabled={!product.price || product.price === ''}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <HiPlus size={16} />
                        {product.price && product.price !== '' ? 'Add to Cart' : 'Price Required'}
                      </motion.button>
                    </div>
                    
                    {/* Add to Cart Animation */}
                    <AnimatePresence>
                      {addedProductId === product.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1.2, 1.2, 0.3],
                            x: [0, 0, 200, 400],
                            y: [0, -20, -80, -150]
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeInOut' }}
                          className="pointer-events-none absolute right-4 top-4 z-10"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-500 text-white shadow-lg">
                            <HiShoppingCart size={20} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Fixed Cart Button - Top Right */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed right-6 top-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-success-600 to-success-500 text-white shadow-lg shadow-success-500/50 transition-all md:top-28"
          >
            <HiShoppingCart size={24} />
            <motion.span
              key={cartCount}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold ring-2 ring-white"
            >
              {cartCount}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
      />

      <FloatingWhatsApp />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default ShopPage
