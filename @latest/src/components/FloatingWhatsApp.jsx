import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { business } from '../data/siteData'

const pulse = {
  animate: { scale: [1, 1.05, 1] },
  transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
}
const hover = {
  whileHover: { y: -3, scale: 1.08 },
}
const buttonClass =
  'inline-flex items-center justify-center rounded-full p-3.5 text-white shadow-lg transition-all duration-300'

function FloatingWhatsApp() {
  const message = encodeURIComponent(
    'Hello, I want details about mobile accessories and repair services.',
  )
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      <motion.a
        href="https://www.instagram.com/skarrvsalesindia?igsh=NHJ3djdzc3o1bGQ3&utm_source=qr"
        target="_blank"
        rel="noreferrer"
        aria-label="Follow on Instagram"
        {...pulse}
        {...hover}
        className={`${buttonClass} bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] shadow-[0_0_20px_rgba(131,58,180,0.4)]`}
      >
        <FaInstagram size={19} aria-hidden="true" />
      </motion.a>
      <motion.a
        href={`https://wa.me/${business.whatsappPhone}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        {...pulse}
        {...hover}
        className={`${buttonClass} bg-success-500 shadow-glow-success`}
      >
        <FaWhatsapp size={19} aria-hidden="true" />
      </motion.a>
    </div>
  )
}

export default FloatingWhatsApp
