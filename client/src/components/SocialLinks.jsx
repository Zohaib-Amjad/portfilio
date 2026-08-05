import linkedinLogo from '../assets/logos/linkedin.svg'
import { profile } from '../data/profile'

const GREEN = '68C17A'

const localLogos = {
  linkedin: linkedinLogo,
}

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {profile.socials.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="icon-button"
          aria-label={social.label}
          title={social.label}
        >
          <img
            src={localLogos[social.id] || `https://cdn.simpleicons.org/${social.slug}/${GREEN}`}
            alt=""
            aria-hidden="true"
            data-rain-ignore
            className="h-4 w-4 object-contain opacity-90"
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  )
}
