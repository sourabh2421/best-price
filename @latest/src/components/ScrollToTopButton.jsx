import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 360)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-24 right-5 z-50 rounded-xl border border-neutral-200 bg-white/90 p-3 text-neutral-700 shadow-sm backdrop-blur transition-all duration-300"
    >
      <FaArrowUp size={16} />
    </motion.button>
  )
}

export default ScrollToTopButton
