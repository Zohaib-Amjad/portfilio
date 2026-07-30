import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { CornerDownLeft, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import logo from '../assets/Logo.png'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

const searchItems = [
  ...links.map((link) => ({ ...link, category: 'Section' })),
  ...projects.map((project) => ({
    label: project.title,
    href: '#projects',
    category: 'Project',
  })),
  ...skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      label: skill.name,
      href: '#skills',
      category: group.title,
    })),
  ),
]

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Zohaib — home">
      <span className="brand-logo-frame flex h-10 w-24 items-center justify-center overflow-hidden rounded-xl border border-accent/30 shadow-glow transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.03] lg:h-12 lg:w-36">
        <img
          src={logo}
          alt="Zohaib"
          className="brand-logo h-full w-full object-cover object-center"
          width="144"
          height="48"
        />
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains('light'),
  )
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((current) => !current)
      }

      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  const toggleTheme = () => {
    const nextIsLight = !isLight
    setIsLight(nextIsLight)
    document.documentElement.classList.toggle('light', nextIsLight)
    window.localStorage.setItem('portfolio-theme', nextIsLight ? 'light' : 'dark')
  }

  return (
    <>
      <header
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[1180px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 shadow-[0_18px_55px_rgba(0,0,0,0.24)]'
          : 'shadow-[0_12px_40px_rgba(0,0,0,0.14)]'
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-5 sm:px-6" aria-label="Main navigation">
        <Logo />

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <SearchButton onClick={() => setSearchOpen(true)} />
          <ThemeToggle isLight={isLight} onToggle={toggleTheme} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SearchButton onClick={() => setSearchOpen(true)} />
          <ThemeToggle isLight={isLight} onToggle={toggleTheme} />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-heading"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className="h-[2px] w-full bg-white/[.04]" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-accent shadow-glow"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-b border-white/10 bg-background/95 px-5 pb-6 backdrop-blur-xl lg:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex border-b border-white/5 py-4 font-mono text-sm capitalize text-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </header>
      <CommandSearch
        open={searchOpen}
        query={query}
        onQueryChange={setQuery}
        onClose={() => {
          setSearchOpen(false)
          setQuery('')
        }}
      />
    </>
  )
}

function SearchButton({ onClick }) {
  return (
    <button
      type="button"
      className="icon-button h-10 w-10"
      aria-label="Search portfolio"
      title="Search portfolio (Ctrl + K)"
      onClick={onClick}
    >
      <Search size={17} />
    </button>
  )
}

function CommandSearch({ open, query, onQueryChange, onClose }) {
  const normalizedQuery = query.trim().toLowerCase()
  const results = searchItems
    .filter((item) =>
      `${item.label} ${item.category}`.toLowerCase().includes(normalizedQuery),
    )
    .slice(0, 8)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-background/75 px-4 pt-24 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search portfolio"
            className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5">
              <Search size={19} className="shrink-0 text-accent" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search sections, projects, or skills..."
                className="h-16 w-full bg-transparent text-sm text-heading outline-none placeholder:text-faint"
              />
              <kbd className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <div className="max-h-[22rem] overflow-y-auto p-2">
              {results.length ? (
                results.map((item, index) => (
                  <a
                    key={`${item.category}-${item.label}-${index}`}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-accent/10"
                  >
                    <span>
                      <span className="block text-sm font-medium text-heading">
                        {item.label}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
                        {item.category}
                      </span>
                    </span>
                    <CornerDownLeft
                      size={16}
                      className="text-faint transition-colors group-hover:text-accent"
                    />
                  </a>
                ))
              ) : (
                <p className="px-4 py-10 text-center text-sm text-muted">
                  No matching result found.
                </p>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-3 font-mono text-[10px] text-muted">
              Tip: press Ctrl + K from anywhere
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ThemeToggle({ isLight, onToggle }) {
  return (
    <button
      type="button"
      className="icon-button h-10 w-10"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      onClick={onToggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLight ? 'sun' : 'moon'}
          className="grid place-items-center"
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.18 }}
        >
          {isLight ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
