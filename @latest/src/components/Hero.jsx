import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import { HiArrowDown, HiShoppingBag } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import heroBg from '../assets/heroimagebg.webp'
import { business } from '../data/siteData'
import PrimaryButton from './ui/PrimaryButton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
}

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <section
      id="home"
      ref={heroRef}
      className="section-anchor relative overflow-hidden bg-white pt-24 md:pt-32"
      aria-label="Hero section"
    >
      {/* Grid overlay for editorial feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      
      <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
        {/* Left side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: contentY }}
          className="relative z-10"
        >
          {/* Trust badge */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8 inline-block"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <FaStar className="text-yellow-400" size={14} />
                <span className="text-sm font-medium text-slate-900">
                  {business.rating}
                </span>
              </div>
              <div className="h-3 w-px bg-slate-300" />
              <span className="text-sm text-slate-600">
                {business.reviewsCount}+ reviews
              </span>
            </div>
          </motion.div>

          {/* Main headline - Enhanced typography */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            Best Mobile
            <br />
            <span className="relative">
              Accessories
              <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary-600 to-accent-500 opacity-20" />
            </span>
            <br />
            at{' '}
            <span className="relative bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 bg-clip-text text-transparent">
              Best Prices
            </span>
          </motion.h1>

          {/* Hindi subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg font-medium text-slate-600 tracking-wide"
          >
            {business.hindiName}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-slate-700"
          >
            Premium quality mobile accessories and expert phone repair services in West Patel Nagar, Delhi. 
            <span className="font-medium text-slate-900"> Trusted by thousands of customers.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap"
          >
            <motion.a
              href={`tel:${business.phone}`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-700 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">Call Now</span>
            </motion.a>
            
            <Link to="/shop">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                <HiShoppingBag size={20} />
                Shop Now
              </motion.button>
            </Link>
            
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
            >
              Visit Store
            </motion.a>
          </motion.div>

          {/* Location */}
          <motion.p
            variants={itemVariants}
            className="mt-8 flex items-center gap-2 text-sm text-slate-500"
          >
            <span className="text-primary-600">📍</span>
            {business.address}
          </motion.p>
        </motion.div>

        {/* Right side: Product showcase */}
        <motion.div
          style={{ y: imageY }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Background accent */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-primary-50 to-accent-50 opacity-60" />
            
            {/* Main product image */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-2xl shadow-slate-900/10">
              <img
                src={heroBg}
                alt="Mobile accessories showcase"
                className="h-full w-full max-w-md rounded-xl object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-8 rounded-xl bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-success-500 flex items-center justify-center">
                  <FaStar className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900">{business.rating}/5</p>
                  <p className="text-xs text-slate-500">Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-4 bottom-8 rounded-xl bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">₹</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900">Best</p>
                  <p className="text-xs text-slate-500">Prices</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <HiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
