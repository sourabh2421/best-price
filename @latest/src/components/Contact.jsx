import { FaClock, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { business } from '../data/siteData'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    business.mapQuery,
  )}&output=embed`

  return (
    <section id="contact" className="section-anchor bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Visit Us"
          title="Location & Contact"
          description="Visit our mobile accessories shop in West Patel Nagar, Delhi, or call us for quick support and best-price deals."
        />

        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-5">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-amber-500" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-neutral-400">Address</p>
                  <p className="text-neutral-600">{business.address}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaPhoneAlt className="mt-1 text-amber-500" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-neutral-400">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="font-semibold text-neutral-800 transition hover:text-amber-500"
                  >
                    {business.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <FaClock className="mt-1 text-amber-500" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-neutral-400">
                    Opening Hours
                  </p>
                  <p className="text-neutral-600">{business.status}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FaInstagram className="mt-1 text-amber-500" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-neutral-400">Instagram</p>
                  <a
                    href={business.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-neutral-800 transition hover:text-amber-500"
                  >
                    Follow us on Instagram
                  </a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
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
