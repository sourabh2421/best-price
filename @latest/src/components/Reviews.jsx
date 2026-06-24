import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { testimonials } from '../data/siteData'
import SectionHeading from './ui/SectionHeading'

function Reviews() {
  const list = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const card = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="reviews" className="section-anchor bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Loved By Local Customers"
          description="A perfect 5-star reputation built through quality service and fair pricing."
        />

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((review) => (
            <motion.article
              key={review.quote}
              variants={card}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/20 p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-success-500/10"
            >
              <FaQuoteLeft className="text-success-500" />
              <p className="mt-4 leading-relaxed text-slate-600">{review.quote}</p>
              <div className="mt-4 flex items-center gap-1 text-success-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={`${review.author}-${i}`} size={14} />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{review.author}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
