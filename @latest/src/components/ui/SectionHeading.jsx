import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary-600">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base font-normal leading-relaxed text-slate-600 md:text-lg">
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
