import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import { education, languages } from '../data/resume'
import { profile } from '../data/profile'

export default function Resume() {
  return (
    <section id="resume" className="section-space">
      <div className="container-shell">
        <SectionHeading
          label="Resume"
          title="Background & education."
          description="Software engineering education supported by practical development experience and continuous self-learning."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="panel flex flex-col items-start justify-between gap-8 p-7 sm:flex-row sm:items-center sm:p-10"
        >
          <div className="flex items-start gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <FileText size={22} />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-heading">
                {profile.name} — {profile.currentRole}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                React, Next.js, TypeScript, Tailwind CSS, WordPress, Payload CMS,
                Supabase, and modern deployment workflows.
              </p>
            </div>
          </div>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="button-primary shrink-0"
          >
            Open printable resume <Download size={17} />
          </a>
        </motion.div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="panel p-7 sm:p-9"
          >
            <div className="mb-7 flex items-center gap-3">
              <GraduationCap size={20} className="text-accent" />
              <h3 className="font-display text-xl font-semibold text-heading">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.qualification} className="border-b border-white/[.07] pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-medium text-heading">{item.qualification}</h4>
                    <span className="font-mono text-[10px] text-accent">{item.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-body">{item.institution}</p>
                  <p className="mt-2 font-mono text-[10px] text-muted">{item.subjects}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <article className="panel p-7">
              <div className="mb-5 flex items-center gap-3">
                <Languages size={19} className="text-accent" />
                <h3 className="font-display text-lg font-semibold text-heading">Languages</h3>
              </div>
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.name} className="flex justify-between gap-4 text-sm">
                    <span className="text-body">{language.name}</span>
                    <span className="font-mono text-[10px] text-muted">{language.level}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel space-y-4 p-7">
              <ContactLine icon={Mail} value={profile.email} href={`mailto:${profile.email}`} />
              <ContactLine icon={Phone} value={profile.phone} href={`tel:${profile.phone.replaceAll(' ', '')}`} />
              <ContactLine icon={MapPin} value={profile.location} />
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactLine({ icon: Icon, value, href }) {
  const content = (
    <>
      <Icon size={16} className="shrink-0 text-accent" />
      <span className="break-all">{value}</span>
    </>
  )

  return href ? (
    <a href={href} className="flex items-center gap-3 text-xs text-muted transition-colors hover:text-accent">
      {content}
    </a>
  ) : (
    <p className="flex items-center gap-3 text-xs text-muted">{content}</p>
  )
}
