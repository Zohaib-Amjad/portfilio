import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

const focus = ['Next.js architecture', 'Payload CMS builds', 'Supabase products']

export default function About() {
  return (
    <section id="about" className="section-space border-t border-white/5">
      <div className="container-shell">
        <SectionHeading
          label="About"
          title="Design-minded. Code-driven."
          description="A software engineering student building practical experience across modern frontend and CMS development."
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel p-7 sm:p-10"
          >
            <p className="text-xl leading-9 text-body sm:text-2xl sm:leading-10">
              I&apos;m Muhammad Zohaib, an emerging full-stack developer who enjoys
              turning complex problems into clear digital experiences.
            </p>
            <p className="mt-6 leading-8 text-muted">
              {profile.summary}
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              Let&apos;s connect <ArrowUpRight size={15} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="panel p-7 sm:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-[.2em] text-muted">Current focus</p>
            <div className="mt-7 space-y-5">
              {focus.map((item) => (
                <div key={item} className="flex items-center gap-4 border-b border-white/5 pb-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Check size={15} />
                  </span>
                  <span className="font-display font-semibold text-heading">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              {profile.status}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
