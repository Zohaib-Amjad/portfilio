import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GitHubCalendar } from 'react-github-calendar'
import 'react-github-calendar/tooltips.css'
import SectionHeading from '@/components/SectionHeading'
import { profile } from '@/data/profile'

const githubUsername =
  profile.githubUsername ||
  profile.github.replace(/https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')

const calendarTheme = {
  dark: ['#27272a', '#3f3f46', '#52525b', '#a1a1aa', '#e4e4e7'],
  light: ['#e4e4e7', '#a1a1aa', '#71717a', '#52525b', '#27272a'],
}

const WEEKS = 53
const LABEL_GUTTER = 32
const BLOCK_MARGIN = 3

export default function GithubActivity() {
  const calendarRef = useRef(null)
  const [scheme, setScheme] = useState('dark')
  const [blockSize, setBlockSize] = useState(12)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setScheme(root.classList.contains('light') ? 'light' : 'dark')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = calendarRef.current
    if (!node) return undefined

    const updateSize = () => {
      const width = node.clientWidth
      if (width < 200) return
      const size = Math.floor((width - LABEL_GUTTER) / WEEKS - BLOCK_MARGIN)
      setBlockSize(Math.max(8, Math.min(18, size)))
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const labels = useMemo(
    () => ({
      totalCount: '{{count}} contributions in the last year',
      legend: { less: 'Less', more: 'More' },
    }),
    [],
  )

  return (
    <section id="activity" className="section-space">
      <div className="container-shell">
        <SectionHeading
          label="Activity"
          title="Days I Code."
          description="A live view of my GitHub contribution rhythm across the last year."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="panel overflow-x-auto p-5 sm:p-8"
        >
          <div ref={calendarRef} className="github-calendar w-full text-muted">
            <GitHubCalendar
              username={githubUsername}
              colorScheme={scheme}
              theme={calendarTheme}
              blockSize={blockSize}
              blockMargin={BLOCK_MARGIN}
              blockRadius={2}
              fontSize={12}
              labels={labels}
              style={{ width: '100%' }}
              tooltips={{
                activity: {
                  text: (activity) =>
                    `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
                },
              }}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
              @{githubUsername}
            </p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-accent-light"
            >
              View on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
