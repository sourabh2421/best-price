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
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 7 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-32 right-5 z-50 rounded-2xl border border-slate-200 bg-white/95 p-3.5 text-primary-600 shadow-lg backdrop-blur transition-all duration-300 hover:shadow-glow"
    >
      <FaArrowUp size={18} />
    </motion.button>
  )
}

export default ScrollToTopButton
