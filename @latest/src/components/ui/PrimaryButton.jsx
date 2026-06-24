import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const baseStyles =
  'inline-flex items-center justify-center rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'

function PrimaryButton({
  href,
  children,
  className = '',
  variant = 'solid',
  target,
  rel,
}) {
  const variantStyles =
    variant === 'outline'
      ? 'border-2 border-slate-300 bg-white text-slate-700 hover:border-primary-500 hover:text-primary-600'
      : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-glow'

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </motion.a>
  )
}

PrimaryButton.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'outline']),
  target: PropTypes.string,
  rel: PropTypes.string,
}

export default PrimaryButton
