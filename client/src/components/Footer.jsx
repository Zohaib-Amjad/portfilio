import { BriefcaseBusiness, GitFork, MoveUpRight } from 'lucide-react'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/zohaibamjad1003', icon: GitFork },
  { label: 'Printable resume', href: 'http://zohaibamjad1003.vercel.app/', icon: BriefcaseBusiness },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-shell flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Zohaib. Built with intent.
          </p>
          <p className="mt-2 font-mono text-[10px] text-faint">
            React · Express · MongoDB
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label={label}
            >
              <Icon size={17} />
            </a>
          ))}
          <a href="#home" className="icon-button ml-2" aria-label="Back to top">
            <MoveUpRight size={17} className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  )
}
