import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import HoverLetters from './HoverLetters'
import SectionHeading from './SectionHeading'
import { education } from '../data/resume'

export default function Education() {
  return (
    <section id="education" className="section-space border-t border-white/5">
      <div className="container-shell">
        <SectionHeading
          label="Education"
          title="Learning foundations."
          description="Formal software engineering studies that support the projects and tools I ship day to day."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {education.map((item, index) => (
            <motion.article
              key={item.qualification}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.25 }}
              className="panel p-6 sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap size={18} />
                </span>
                <span className="font-mono text-[10px] text-accent">{item.period}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-heading">
                <HoverLetters text={item.qualification} />
              </h3>
              <p className="mt-2 text-sm text-body">{item.institution}</p>
              <p className="mt-3 font-mono text-[10px] text-muted">{item.subjects}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
