import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { business } from '../data/siteData'

function FloatingWhatsApp() {
  const message = encodeURIComponent(
    'Hello, I want details about mobile accessories and repair services.',
  )

  return (
    <motion.a
      href={`https://wa.me/${business.whatsappPhone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ y: -2, scale: 1.06 }}
      className="fixed bottom-6 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300"
    >
      <FaWhatsapp size={18} />
      WhatsApp
    </motion.a>
  )
}

export default FloatingWhatsApp
