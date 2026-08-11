// Theme-aware mono tint: light-gray icons (visible on dark). Light mode darkens via CSS.
import vscodeLogo from '@/assets/logos/vscode.svg'
import { assetUrl } from '@/lib/assetUrl'

const ICON = 'D4D4D8'
const logo = (slug) => `https://cdn.simpleicons.org/${slug}/${ICON}`
const vscodeLogoUrl = assetUrl(vscodeLogo)

export const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Next.js', logo: logo('nextdotjs') },
      { name: 'React', logo: logo('react') },
      { name: 'TypeScript', logo: logo('typescript') },
      { name: 'JavaScript', logo: logo('javascript') },
      { name: 'Tailwind CSS', logo: logo('tailwindcss') },
      { name: 'Bootstrap', logo: logo('bootstrap') },
      { name: 'CSS3', logo: logo('css') },
      { name: 'HTML5', logo: logo('html5') },
    ],
  },
  {
    title: 'Backend & CMS',
    skills: [
      { name: 'Node.js', logo: logo('nodedotjs') },
      { name: 'Express.js', logo: logo('express') },
      { name: 'Supabase', logo: logo('supabase') },
      { name: 'MongoDB', logo: logo('mongodb') },
      { name: 'Payload CMS', logo: logo('payloadcms') },
      { name: 'WordPress', logo: logo('wordpress') },
      { name: 'Elementor', logo: logo('elementor') },
    ],
  },
  {
    title: 'Editors & Tools',
    skills: [
      { name: 'Antigravity', logo: logo('google'), note: 'Google Antigravity' },
      { name: 'Cursor', logo: logo('cursor') },
      { name: 'VS Code', logo: vscodeLogoUrl },
      { name: 'Git & GitHub', logo: logo('github') },
      { name: 'Chrome DevTools', logo: logo('googlechrome') },
      { name: 'npm / pnpm', logo: logo('npm') },
      { name: 'Testing & Debugging', glyph: 'bug' },
    ],
  },
  {
    title: 'Deployment & Workflow',
    skills: [
      { name: 'Vercel', logo: logo('vercel') },
      { name: 'Netlify', logo: logo('netlify') },
      { name: 'Railway', logo: logo('railway') },
      { name: 'Figma', logo: logo('figma') },
      { name: 'Communication', glyph: 'chat' },
      { name: 'Teamwork', glyph: 'users' },
    ],
  },
]
