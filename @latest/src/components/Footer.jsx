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
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-white py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-bold text-neutral-900">
            Best Price Mobile Accessories And Repairing
          </h3>
          <p className="mt-3 text-sm text-neutral-500">{business.hindiName}</p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-amber-500">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-neutral-600 transition hover:text-neutral-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-amber-500">
            Contact Info
          </h4>
          <a
            href={`tel:${business.phone}`}
            className="mt-4 flex items-center gap-2 text-neutral-700 transition hover:text-neutral-900"
          >
            <FaPhoneAlt size={13} />
            {business.phone}
          </a>
          <a
            href={business.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 text-neutral-700 transition hover:text-neutral-900"
          >
            <FaInstagram size={15} />
            Instagram
          </a>
          <p className="mt-4 text-sm text-neutral-500">{business.address}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-200 px-4 pt-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Best Price Mobile Accessories And Repairing. All rights reserved.
      </div>
    </motion.footer>
  )
}

export default Footer
