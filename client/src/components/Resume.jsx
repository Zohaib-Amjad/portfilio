import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import HoverLetters from './HoverLetters'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

export default function Resume() {
  return (
    <section id="resume" className="section-space">
      <div className="container-shell">
        <SectionHeading
          label="Resume"
          title="Download the full profile."
          description="A printable summary of my role, stack, and experience — ready to share or print."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="panel mx-auto flex max-w-2xl flex-col gap-6 p-7 sm:p-9"
        >
          <div className="flex items-start gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <FileText size={22} />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-heading">
                <HoverLetters text={`${profile.name} — ${profile.currentRole}`} />
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                React, Next.js, TypeScript, Tailwind CSS, WordPress, Payload CMS,
                Supabase, and modern deployment workflows.
              </p>
            </div>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary w-fit"
          >
            Open printable resume <Download size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
