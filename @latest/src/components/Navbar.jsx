import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { business } from '../data/siteData'

const links = [
  { id: 'about', label: 'About', type: 'scroll' },
  { id: 'services', label: 'Services', type: 'scroll' },
  { id: 'products', label: 'Products', type: 'scroll' },
  { id: 'shop', label: 'Shop', type: 'route', path: '/shop' },
  { id: 'reviews', label: 'Reviews', type: 'scroll' },
  { id: 'contact', label: 'Contact', type: 'scroll' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const location = useLocation()
  const phoneHref = useMemo(() => `tel:${business.phone}`, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
      if (location.pathname === '/') {
        const ids = ['home', ...links.filter(l => l.type === 'scroll').map((link) => link.id)]
        let current = 'home'
        ids.forEach((id) => {
          const section = document.getElementById(id)
          if (section && window.scrollY >= section.offsetTop - 120) {
            current = id
          }
        })
        setActive(current)
      } else if (location.pathname === '/shop') {
        setActive('shop')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-navbar border-b border-slate-200/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-2 sm:gap-3 min-w-0"
        >
          <img
            src={logo}
            alt="Best Price Mobile Accessories and Repairing Shop Delhi"
            className="h-10 sm:h-11 md:h-14 shrink-0 rounded-lg bg-white p-1 object-contain shadow-sm transition-transform duration-300 hover:scale-105"
            loading="eager"
          />
          <span className="hidden font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900 sm:block truncate">
            Best Price
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <div key={link.id} className="relative">
              {link.type === 'route' ? (
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active === link.id
                      ? 'text-primary-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={`#${link.id}`}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active === link.id
                      ? 'text-primary-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              )}
              {active === link.id && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                />
              )}
            </div>
          ))}
          <a
            href={phoneHref}
            className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow whitespace-nowrap"
          >
            Call Now
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl border border-slate-200 bg-white/90 p-2.5 text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-slate-50 md:hidden min-h-[44px] min-w-[44px]"
        >
          {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/60 bg-white/95 px-4 sm:px-6 py-5 backdrop-blur md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              link.type === 'route' ? (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active === link.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active === link.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href={phoneHref}
              className="mt-2 inline-flex w-full sm:w-auto justify-center items-center rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 min-h-[44px]"
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
