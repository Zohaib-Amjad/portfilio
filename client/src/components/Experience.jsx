import { motion } from 'framer-motion'
import { CheckCircle2, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { experience } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="section-space bg-surface/30">
      <div className="container-shell">
        <SectionHeading
          label="Experience"
          title="Learning by shipping."
          description="Hands-on experience across frontend development, WordPress production, CMS workflows, and responsive implementation."
        />

        <div className="relative space-y-5 before:absolute before:bottom-6 before:left-[1.15rem] before:top-6 before:w-px before:bg-accent/20">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
              className="panel relative ml-12 grid gap-7 p-6 sm:p-8 lg:grid-cols-[.65fr_1.35fr]"
            >
              <span className="absolute -left-[3.65rem] top-8 grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-background font-mono text-[10px] text-accent shadow-glow">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs uppercase tracking-[.18em] text-accent">
                    {item.duration}
                  </p>
                  {item.current && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm font-medium text-body">{item.company}</p>
                {item.location && (
                  <p className="mt-2 flex items-center gap-2 font-mono text-[10px] text-muted">
                    <MapPin size={12} /> {item.location}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-muted">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-accent" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
