import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

function Reveal({ children, className = '', delay = 0, y = 26 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  y: PropTypes.number,
}

export default Reveal
