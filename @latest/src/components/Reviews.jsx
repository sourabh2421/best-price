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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  }

  return (
    <section id="reviews" className="section-anchor bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
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
              whileHover={{ y: -5, scale: 1.03 }}
              className="rounded-2xl border border-neutral-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <FaQuoteLeft className="text-amber-500" />
              <p className="mt-4 text-neutral-600">{review.quote}</p>
              <div className="mt-4 flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={`${review.author}-${i}`} size={14} />
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-neutral-900">{review.author}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
