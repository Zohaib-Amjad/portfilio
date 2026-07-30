import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { profile } from '../data/profile'

const roles = ['Frontend Developer', 'Building CodivZ']

export default function Hero() {
  const typedRole = useTypingEffect(roles)

  return (
    <section id="home" className="storm-hero relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="grid-overlay absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="orb -left-40 top-32" aria-hidden="true" />
      <div className="doom-glow -right-48 top-24" aria-hidden="true" />

      <div className="container-shell relative z-10 grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-glow" />
            {profile.status}
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[.95] tracking-[-0.055em] text-heading sm:text-7xl lg:text-[5.8rem]">
            I build digital
            <span className="block text-gradient">experiences.</span>
          </h1>
          <p className="mt-7 flex min-h-8 items-center font-mono text-sm text-muted sm:text-base">
            <span className="mr-3 text-accent">&gt;</span>
            {typedRole}
            <span className="ml-1 h-5 w-2 animate-cursor bg-accent" aria-hidden="true" />
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            I&apos;m Zohaib — a frontend developer turning complex ideas into fast,
            thoughtful interfaces that feel effortless to use.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/zohaib-resume.pdf" className="button-primary" target="_blank">
              Resume <Download size={17} />
            </a>
            <a href="#contact" className="button-secondary">
              Start a conversation <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative ml-auto hidden w-full max-w-lg lg:block lg:justify-self-end"
          aria-hidden="true"
        >
          <div className="code-window storm-card">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4a5560]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5d6b74]" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="ml-auto font-mono text-[11px] text-muted">developer.tsx</span>
            </div>
            <pre className="overflow-hidden p-7 font-mono text-[13px] leading-7 text-code">
              <code>
                <span className="text-steel">const</span> developer = {'{\n'}
                {'  '}name: <span className="text-moss">&apos;Zohaib&apos;</span>,{'\n'}
                {'  '}focus: <span className="text-moss">&apos;frontend&apos;</span>,{'\n'}
                {'  '}stack: [{'\n'}
                {'    '}<span className="text-moss">&apos;Next.js&apos;</span>,{'\n'}
                {'    '}<span className="text-moss">&apos;TypeScript&apos;</span>,{'\n'}
                {'    '}<span className="text-moss">&apos;Payload CMS&apos;</span>{'\n'}
                {'  '}],{'\n'}
                {'  '}ships: <span className="text-steel">true</span>{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
          <div className="absolute -bottom-6 right-4 rounded-xl border border-accent/25 bg-panel px-5 py-3 font-mono text-xs text-accent shadow-2xl">
            storm_protocol: online
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[.25em] text-muted md:flex"
      >
        Scroll <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  )
}
