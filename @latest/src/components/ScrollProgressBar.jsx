import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed left-0 right-0 top-0 z-[60] h-1 bg-gradient-to-r from-amber-500 to-orange-500"
    />
  )
}

export default ScrollProgressBar
