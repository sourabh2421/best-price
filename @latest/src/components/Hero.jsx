import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import heroBg from '../assets/heroimagebg.webp'
import { business } from '../data/siteData'
import PrimaryButton from './ui/PrimaryButton'

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      id="home"
      ref={heroRef}
      className="section-anchor relative isolate overflow-hidden pt-28 md:pt-32"
      aria-label="Hero section"
    >
      {/* ── Background image at low opacity ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 h-[130%]"
        aria-hidden="true"
      >
        <img
          src={heroBg}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-[0.50]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/80 to-amber-100/60" />
        <div className="absolute left-1/2 top-[30%] h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-200/40 via-orange-100/30 to-transparent blur-3xl" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute -left-32 top-20 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-10 h-48 w-48 rounded-full bg-orange-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-8 md:pb-36 md:pt-12">
        {/* ── Centered text ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 shadow-sm backdrop-blur"
          >
            <FaStar className="text-amber-500" />
            Rated {business.rating} ({business.reviewsCount} reviews)
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
          >
            Best Mobile Accessories
            <br />
            at the{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Lowest Prices
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-lg text-base text-neutral-500"
          >
            {business.hindiName}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg"
          >
            Premium quality accessories and expert phone repair services in West
            Patel Nagar, Delhi. Trusted by thousands of happy customers.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <PrimaryButton
              href={`tel:${business.phone}`}
              className="w-full sm:w-auto"
            >
              Call Now
            </PrimaryButton>
            <PrimaryButton
              href="#contact"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Visit Store
            </PrimaryButton>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-sm text-neutral-400"
          >
            {business.address}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
