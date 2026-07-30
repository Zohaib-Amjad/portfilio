import { motion } from 'framer-motion'
import { ArrowUpRight, GitFork } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="section-space">
      <div className="container-shell">
        <SectionHeading
          label="Selected work"
          title="Built to be used."
          description="Selected frontend and WordPress work drawn from real client delivery and practical learning projects."
        />

        <div className="space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="project-card group"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-semibold text-heading sm:text-3xl">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-accent">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-2xl leading-7 text-muted">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="tech-tag">{technology}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 lg:justify-end">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-button"
                    aria-label={`${project.title} source code`}
                  >
                    <GitFork size={18} />
                  </a>
                )}
                <a
                  href={project.liveUrl}
                  target={project.liveUrl.startsWith('#') ? undefined : '_blank'}
                  rel={project.liveUrl.startsWith('#') ? undefined : 'noreferrer'}
                  className="icon-button"
                  aria-label={`View ${project.title} live`}
                >
                  <ArrowUpRight size={19} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
