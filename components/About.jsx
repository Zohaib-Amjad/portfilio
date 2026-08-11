import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import HoverLetters from '@/components/HoverLetters'
import SectionHeading from '@/components/SectionHeading'
import { profile } from '@/data/profile'
import profileImage from '@/assets/e.png'
import hoverProfileImage from '@/assets/d.png'
import { assetUrl } from '@/lib/assetUrl'

const focus = ['Next.js architecture', 'Payload CMS builds', 'Supabase products']

export default function About() {
  return (
    <section id="about" className="section-space border-t border-white/5">
      <div className="container-shell">
        <SectionHeading
          label="About"
          title="Design-minded. Code-driven."
          description="A software engineer building practical experience across full-stack development, modern web products, and CMS platforms."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[.78fr_1.22fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-accent/20 bg-surface/70 p-2 shadow-glow lg:max-w-none"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-70" />
            <div className="relative h-full min-h-[28rem] overflow-hidden rounded-[1.2rem]">
              <img
                src={assetUrl(profileImage)}
                alt="Muhammad Zohaib"
                data-rain-portrait
                data-rain-ignore
                className="h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              />
              <img
                src={assetUrl(hoverProfileImage)}
                alt=""
                aria-hidden="true"
                data-rain-ignore
                className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[10px] uppercase tracking-[.24em] text-accent">
                  Software engineer
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-white">
                  <HoverLetters text="Muhammad Zohaib" />
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="panel p-7 sm:p-10"
            >
              <p className="text-xl leading-9 text-body sm:text-2xl sm:leading-10">
                I&apos;m Muhammad Zohaib, a full-stack developer and software engineer
                who enjoys turning complex problems into clear digital experiences.
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
              <div className="mt-7 grid gap-5 sm:grid-cols-3">
                {focus.map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-white/5 pb-5 sm:block">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Check size={15} />
                    </span>
                    <span className="font-display text-sm font-semibold text-heading sm:mt-3 sm:block">
                      <HoverLetters text={item} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                {profile.status}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
