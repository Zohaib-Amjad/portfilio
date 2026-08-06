import { motion } from 'framer-motion'
import { CheckCircle2, MapPin } from 'lucide-react'
import HoverLetters from '@/components/HoverLetters'
import SectionHeading from '@/components/SectionHeading'
import { experience } from '@/data/resume'
import doomBadge from '@/assets/doom-medallion.svg'
import { assetUrl } from '@/lib/assetUrl'

const fallbackLogo = assetUrl(doomBadge)

export default function Experience() {
  return (
    <section id="experience" className="section-space bg-surface/30">
      <div className="container-shell">
        <SectionHeading
          label="Experience"
          title="Learning by shipping."
          description="Hands-on software engineering experience across full-stack development, WordPress production, CMS workflows, and responsive implementation."
        />

        <div className="relative space-y-8 md:space-y-12">
          {experience.map((item, index) => {
            const cardOnLeft = index % 2 === 0
            const isFirst = index === 0
            const isLast = index === experience.length - 1

            return (
              <motion.article
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 md:grid-cols-[minmax(0,1fr)_3.75rem_minmax(0,1fr)] md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-6 z-0 w-px -translate-x-1/2 bg-accent/35 md:left-1/2 ${
                    isFirst ? 'top-1/2' : 'top-0'
                  } ${isLast ? 'bottom-1/2' : '-bottom-8 md:-bottom-12'}`}
                />

                <div
                  className={
                    cardOnLeft
                      ? 'order-2 md:order-none md:col-start-1 md:row-start-1'
                      : 'order-2 md:order-none md:col-start-3 md:row-start-1'
                  }
                >
                  <div className="panel p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3 md:hidden">
                      <p className="font-mono text-xs uppercase tracking-[.18em] text-accent">
                        {item.duration}
                      </p>
                      {item.current && (
                        <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-1 hidden items-center gap-3 md:flex">
                      {item.current && (
                        <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-xl font-semibold text-heading">
                      <HoverLetters text={item.role} />
                    </h3>
                    <div className="mt-2 flex items-center gap-2.5">
                      <img
                        src={item.logo || fallbackLogo}
                        alt=""
                        aria-hidden="true"
                        data-rain-ignore
                        className="h-7 w-7 shrink-0 rounded-md border border-line object-cover"
                      />
                      <p className="text-sm font-medium text-body">{item.company}</p>
                    </div>
                    {item.location && (
                      <p className="mt-2 flex items-center gap-2 font-mono text-[10px] text-muted">
                        <MapPin size={12} /> {item.location}
                      </p>
                    )}
                    <div className="mt-5 space-y-3">
                      {item.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-muted">
                          <CheckCircle2 size={15} className="mt-1 shrink-0 text-accent" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 order-1 flex justify-center md:order-none md:col-start-2 md:row-start-1">
                  <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-accent/60 bg-background p-0.5 shadow-glow">
                    <img
                      src={item.logo || fallbackLogo}
                      alt={`${item.company} logo`}
                      data-rain-ignore
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                </div>

                <div
                  className={
                    cardOnLeft
                      ? 'hidden md:col-start-3 md:row-start-1 md:flex md:items-center md:justify-start'
                      : 'hidden md:col-start-1 md:row-start-1 md:flex md:items-center md:justify-end'
                  }
                >
                  <p className="font-mono text-sm uppercase tracking-[.16em] text-accent">
                    {item.duration}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
