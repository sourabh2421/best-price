import { FaClock, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { business } from '../data/siteData'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    business.mapQuery,
  )}&output=embed`

  return (
    <section id="contact" className="section-anchor bg-slate-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Visit Us"
          title="Location & Contact"
          description="Visit our mobile accessories shop in West Patel Nagar, Delhi, or call us for quick support and best-price deals."
        />

        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary-600">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Address</p>
                  <p className="mt-1 text-slate-600">{business.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-accent-600">
                  <FaPhoneAlt size={15} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="mt-1 block font-semibold text-slate-800 transition-colors duration-300 hover:text-primary-600"
                  >
                    {business.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-success-600">
                  <FaClock size={15} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-slate-600">{business.status}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600">
                  <FaInstagram size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Instagram</p>
                  <a
                    href={business.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block font-semibold text-slate-800 transition-colors duration-300 hover:text-purple-600"
                  >
                    Follow us on Instagram
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10">
            <iframe
              title="Best Price Mobile Accessories And Repairing Location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full lg:h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
