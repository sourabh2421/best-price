import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base font-normal leading-relaxed text-neutral-600 md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

SectionHeading.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default SectionHeading
