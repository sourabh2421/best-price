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
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="services" className="section-anchor bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
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
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/30 p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 p-3 text-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-accent-500 group-hover:text-white group-hover:shadow-glow-accent">
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
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
