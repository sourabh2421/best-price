import { motion } from 'framer-motion'
import { products } from '../data/siteData'
import SectionHeading from './ui/SectionHeading'

function Products() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="products" className="section-anchor bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Product Showcase"
          title="Popular Accessories In Stock"
          description="Browse quality essentials and stylish picks at prices that make sense."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={item}
              whileHover={{ y: -5, scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={`${product.title} for mobile accessories collection`}
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/55 via-neutral-900/15 to-transparent opacity-60" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-semibold text-white drop-shadow-md">
                  {product.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-300">
                  Best Price Collection
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Products
