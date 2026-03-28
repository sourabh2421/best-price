import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logo from '../assets/logo.png'
import { business } from '../data/siteData'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'products', label: 'Products' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const phoneHref = useMemo(() => `tel:${business.phone}`, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
      const ids = ['home', ...links.map((link) => link.id)]
      let current = 'home'
      ids.forEach((id) => {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = id
        }
      })
      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-neutral-200 bg-white/70 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
          className="flex cursor-pointer items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <img
            src={logo}
            alt="Best Price Mobile Accessories and Repairing Shop Delhi"
            className="h-10 rounded-lg bg-white p-1 object-contain transition-transform duration-300 hover:scale-105 md:h-14"
            loading="eager"
          />
          <span className="hidden text-lg font-semibold text-gray-900 sm:block">
            Best Price
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <div key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                className={`text-sm font-medium transition ${
                  active === link.id
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-amber-500"
                />
              )}
            </div>
          ))}
          <a
            href={phoneHref}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Call Now
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-neutral-200 bg-white/80 p-2 text-neutral-700 md:hidden"
        >
          {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white/95 px-6 py-4 backdrop-blur md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                  active === link.id
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={phoneHref}
              className="mt-1 inline-flex w-fit rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
