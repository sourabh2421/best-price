import { motion } from 'framer-motion'
import { FaInstagram, FaPhoneAlt } from 'react-icons/fa'
import { business } from '../data/siteData'

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#products', label: 'Products' },
  { href: '#contact', label: 'Contact' },
]

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="bg-slate-900 py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            Best Price Mobile Accessories And Repairing
          </h3>
          <p className="mt-3 text-sm text-slate-400">{business.hindiName}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Get In Touch
          </h4>
          
          {/* Prominent Call CTA */}
          <a
            href={`tel:${business.phone}`}
            className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
          >
            <FaPhoneAlt size={14} />
            Call Now: {business.phone}
          </a>

          <div className="mt-6 space-y-3">
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-300 transition-colors duration-300 hover:text-white"
            >
              <FaInstagram size={15} />
              Follow on Instagram
            </a>
            <p className="text-sm text-slate-400">{business.address}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 px-4 pt-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Best Price Mobile Accessories And Repairing. All rights reserved.
      </div>
    </motion.footer>
  )
}

export default Footer
