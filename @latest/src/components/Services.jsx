import { HiLightningBolt } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { MdWorkspacePremium } from 'react-icons/md'
import { RiCustomerService2Fill } from 'react-icons/ri'
import { TbDeviceMobileCharging } from 'react-icons/tb'
import { services } from '../data/siteData'
import SectionHeading from './ui/SectionHeading'

const iconMap = {
  accessories: TbDeviceMobileCharging,
  repair: RiCustomerService2Fill,
  premium: MdWorkspacePremium,
  delivery: HiLightningBolt,
}

function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  }

  return (
    <section id="services" className="section-anchor bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything Your Phone Needs, In One Place"
          description="From trendy covers to technical repairs, we deliver quality, speed, and value in every order."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.article
                key={service.title}
                variants={item}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="rounded-2xl border border-neutral-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-xl bg-amber-50 p-3 text-amber-500">
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-neutral-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {service.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
