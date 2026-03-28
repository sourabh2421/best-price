import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const baseStyles =
  'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'

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
      ? 'border border-neutral-300 bg-white text-neutral-700'
      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/30'

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
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
