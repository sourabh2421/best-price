import { business } from '../data/siteData'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

function About() {
  return (
    <section id="about" className="section-anchor bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Us"
          title="Trusted Mobile Accessory Store in Patel Nagar"
          description="We provide high-quality mobile accessories and expert phone repair services at the best prices in Patel Nagar. Known for friendly service, wide product range, and affordable pricing."
        />

        <Reveal className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
              Why customers choose us
            </p>
            <ul className="mt-5 space-y-3 text-neutral-600">
              <li>Wide collection of quality accessories at honest prices.</li>
              <li>Skilled repair support for everyday mobile issues.</li>
              <li>Personalized and polite customer service experience.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
              Store highlights
            </p>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">
                  Rating
                </dt>
                <dd className="text-lg font-semibold text-neutral-900">
                  {business.rating} Stars ({business.reviewsCount} Reviews)
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">
                  Opening Time
                </dt>
                <dd className="text-lg font-semibold text-neutral-900">{business.status}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-neutral-400">
                  Location
                </dt>
                <dd className="text-base text-neutral-600">{business.address}</dd>
              </div>
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

export default About
