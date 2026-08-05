import { motion } from 'framer-motion'
import { ArrowUpRight, GitFork } from 'lucide-react'
import { projects } from '@/data/projects'
import HoverLetters from '@/components/HoverLetters'
import SectionHeading from '@/components/SectionHeading'

function PreviewLink({ href, children, label, className = '' }) {
  if (!href) {
    return <div className={className}>{children}</div>
  }

  const isHash = href.startsWith('#')

  return (
    <a
      href={href}
      target={isHash ? undefined : '_blank'}
      rel={isHash ? undefined : 'noreferrer'}
      aria-label={label}
      className={`block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
    >
      {children}
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-space">
      <div className="container-shell">
        <SectionHeading
          label="Selected work"
          title="Built to be used."
          description="Selected full-stack, frontend, and WordPress work drawn from real client delivery and practical engineering projects."
        />

        <div className="space-y-3">
          {projects.map((project, index) => {
            const previews = project.images?.length
              ? project.images
              : project.image
                ? [{ src: project.image, alt: `${project.title} preview`, href: project.liveUrl }]
                : []
            const multi = previews.length > 1

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                viewport={{ once: true, amount: 0.15 }}
                className="project-card group"
              >
                {previews.length > 0 && (
                  <div className={`project-preview-rail ${multi ? 'project-preview-rail-multi' : ''}`}>
                    {previews.map((preview) => (
                      <PreviewLink
                        key={preview.src + (preview.href || '')}
                        href={preview.href}
                        label={`Open ${preview.alt}`}
                        className="project-preview group/preview"
                      >
                        <img
                          src={preview.src}
                          alt={preview.alt}
                          data-rain-ignore
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition duration-500 group-hover/preview:scale-[1.03]"
                        />
                        <span className="project-preview-shade" aria-hidden="true" />
                        {preview.href && (
                          <span className="project-preview-hint group-hover/preview:opacity-100">
                            Live <ArrowUpRight size={11} />
                          </span>
                        )}
                      </PreviewLink>
                    ))}
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-heading sm:text-xl">
                        <HoverLetters text={project.title} />
                      </h3>
                      {project.featured && (
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">
                      {project.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="tech-tag">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-button h-9 w-9"
                        aria-label={`${project.title} source code`}
                      >
                        <GitFork size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('#') ? undefined : '_blank'}
                        rel={project.liveUrl.startsWith('#') ? undefined : 'noreferrer'}
                        className="icon-button h-9 w-9"
                        aria-label={`View ${project.title} live`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
