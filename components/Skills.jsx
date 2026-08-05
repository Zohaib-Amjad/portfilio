import { motion } from 'framer-motion'
import { Bug, Languages, MessageSquare, Users } from 'lucide-react'
import { languages } from '@/data/resume'
import { skillGroups } from '@/data/skills'
import HoverLetters from '@/components/HoverLetters'
import SectionHeading from '@/components/SectionHeading'

const glyphs = {
  bug: Bug,
  chat: MessageSquare,
  users: Users,
}

function SkillIcon({ skill }) {
  if (skill.logo) {
    return (
      <img
        src={typeof skill.logo === 'string' ? skill.logo : skill.logo?.src}
        alt=""
        aria-hidden="true"
        data-rain-ignore
        className="skill-logo h-4 w-4 shrink-0 object-contain opacity-90 transition-[filter,opacity] duration-300 group-hover/skill:opacity-100"
        loading="lazy"
        decoding="async"
      />
    )
  }

  const Glyph = glyphs[skill.glyph] || Bug
  return <Glyph size={16} className="shrink-0 text-accent" strokeWidth={1.7} />
}

export default function Skills() {
  return (
    <section id="skills" className="section-space bg-surface/30">
      <div className="container-shell">
        <SectionHeading
          label="Capabilities"
          title="Tools I build with."
          description="Frontend, backend, databases, CMS, development tools, and deployment platforms used across hands-on projects."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="panel p-6 sm:p-8"
            >
              <div className="mb-7">
                <h3 className="font-display text-xl font-semibold text-heading">
                  <HoverLetters text={group.title} />
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    title={skill.note || skill.name}
                    className="group/skill flex items-center gap-3 rounded-xl border border-white/10 bg-background/50 p-3 text-sm text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-accent/5 hover:text-heading hover:shadow-glow"
                  >
                    <SkillIcon skill={skill} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="panel mt-4 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <Languages size={18} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-heading">
                <HoverLetters text="Spoken languages" />
              </h3>
              <p className="mt-0.5 text-sm text-muted">Communication across projects and teams.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((language) => (
              <div
                key={language.name}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/50 px-4 py-2.5 text-sm"
              >
                <span className="text-heading">{language.name}</span>
                <span className="font-mono text-[10px] text-accent">{language.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
