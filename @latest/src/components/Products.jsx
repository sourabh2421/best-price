import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'
import { getProductIcon } from '../data/productIcons'
import SectionHeading from './ui/SectionHeading'

function Products() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="products" className="section-anchor bg-slate-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Product Showcase"
          title="Everything You Need for Your Smartphone"
          description="Discover premium mobile accessories and trusted repair services at unbeatable prices."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {productCategories.map((product) => {
            const Icon = getProductIcon(product.icon)
            const visibleItems = product.items.slice(0, 4)
            const extraCount = product.items.length - 4
            const categoryPath = `/products/${product.slug}`

            return (
              <motion.div
                key={product.slug}
                variants={item}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
              >
                {/* Top gradient accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="flex flex-1 flex-col p-6">
                  {/* Icon */}
                  <div className="mb-5 inline-flex w-fit items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 p-3 text-primary-600 ring-1 ring-primary-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-accent-500 group-hover:text-white group-hover:shadow-glow">
                    <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold leading-tight text-slate-900">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                    {product.description}
                  </p>

                  {/* Item list */}
                  <ul className="mt-5 space-y-2">
                    {visibleItems.map((entry) => (
                      <li key={entry} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span
                          aria-hidden="true"
                          className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                        />
                        {entry}
                      </li>
                    ))}
                    {extraCount > 0 && (
                      <li className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"
                        />
                        <Link
                          to={categoryPath}
                          className="text-sm text-primary-600 transition-colors duration-300 hover:text-accent-600"
                        >
                          +{extraCount} more
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-slate-100 px-6 py-4">
                  <Link
                    to={categoryPath}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 transition-all duration-300 hover:text-accent-600 group-hover:gap-2.5"
                  >
                    View Collection
                    <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Products
