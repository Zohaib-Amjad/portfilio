import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills'
import SectionHeading from './SectionHeading'

export default function Skills() {
  return (
    <section id="skills" className="section-space bg-surface/30">
      <div className="container-shell">
        <SectionHeading
          label="Capabilities"
          title="Tools I build with."
          description="Frontend, CMS, development tools, and deployment platforms used across hands-on projects."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="panel group p-6 transition-colors hover:border-accent/25 sm:p-8"
            >
              <div className="mb-7">
                <h3 className="font-display text-xl font-semibold text-heading">{group.title}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {group.skills.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-white/[.06] bg-background/50 p-3 text-sm text-muted transition-colors group-hover:text-body"
                  >
                    <Icon size={17} className="shrink-0 text-accent" strokeWidth={1.7} />
                    <span>{name}</span>
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
