import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import SectionHeading from './ui/SectionHeading'

function Shop() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        credentials: 'include'
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setIsLoading(false)
    }
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

  if (isLoading) {
    return (
      <section id="shop" className="section-anchor bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our Shop"
            title="Featured Products"
            description="Browse our collection of premium mobile accessories"
          />
          <p className="text-center text-slate-600">Loading products...</p>
        </div>
      </section>
    )
  }

  // Show only first 4 products on homepage
  const featuredProducts = products.slice(0, 4)

  return (
    <section id="shop" className="section-anchor relative bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Shop"
          title="Featured Products"
          description="Browse our collection of premium mobile accessories"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {featuredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-slate-500">No products available yet. Check back soon!</p>
            </div>
          ) : (
            featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={item}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={product.imageUrl || `${API_URL}/products/${product.filename}`}
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
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Button */}
        {products.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
            >
              View All Products
              <HiArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Shop
