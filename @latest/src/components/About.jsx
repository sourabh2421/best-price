import { business } from '../data/siteData'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function About() {
  return (
    <section id="about" className="section-anchor bg-slate-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Trusted Mobile Accessory Store in Patel Nagar"
          description="We provide high-quality mobile accessories and expert phone repair services at the best prices in Patel Nagar. Known for friendly service, wide product range, and affordable pricing."
        />

        <Reveal className="grid gap-6 md:grid-cols-2">
          <article className="group rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
              Why customers choose us
            </p>
            <ul className="mt-5 space-y-3 text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success-500" />
                Wide collection of quality accessories at honest prices.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success-500" />
                Skilled repair support for everyday mobile issues.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success-500" />
                Personalized and polite customer service experience.
              </li>
            </ul>
          </article>

          <article className="group rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-600">
              Store highlights
            </p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Rating
                </dt>
                <dd className="text-lg font-semibold text-slate-900">
                  {business.rating} Stars ({business.reviewsCount} Reviews)
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Opening Time
                </dt>
                <dd className="text-lg font-semibold text-slate-900">{business.status}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Location
                </dt>
                <dd className="text-base text-slate-600">{business.address}</dd>
              </div>
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

export default About
