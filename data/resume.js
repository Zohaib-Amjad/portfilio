import hofglobalLogo from '@/assets/companies/hofglobal.jpg'
import wpwizardsLogo from '@/assets/companies/wpwizards.jpg'
import a2zLogo from '@/assets/companies/a2z.jpg'
import { assetUrl } from '@/lib/assetUrl'

export const experience = [
  {
    role: 'Full-Stack Developer Intern',
    company: 'HOF-Global',
    location: null,
    duration: 'Present',
    current: true,
    logo: assetUrl(hofglobalLogo),
    highlights: [
      'Developing practical full-stack experience while contributing to modern digital products.',
    ],
  },
  {
    role: 'WordPress Developer',
    company: 'WPWizards',
    location: 'Lahore, Pakistan',
    duration: '1 year 6 months',
    logo: assetUrl(wpwizardsLogo),
    highlights: [
      'Progressed from intern to WordPress Developer, shipping production client sites.',
      'Developed multiple pixel-perfect WordPress websites using Elementor.',
      'Converted Figma designs into responsive coded and WordPress pages.',
      'Strengthened JavaScript fundamentals and learned React.js for modern web apps.',
    ],
  },
  {
    role: 'Development Intern',
    company: 'A2Z Tech',
    location: 'Muridke, Pakistan',
    duration: '2 months',
    logo: assetUrl(a2zLogo),
    highlights: [
      'Collaborated with senior team members on operational and data tasks.',
      'Built foundational web development skills using HTML and CSS.',
      'Managed and published website content through CMS platforms.',
    ],
  },
]

export const education = [
  {
    qualification: 'BS Software Engineering',
    institution: 'Virtual University of Pakistan',
    period: '2021 — Present',
    subjects: 'Development · Networks · Databases',
  },
  {
    qualification: 'FSc Pre-Engineering',
    institution: 'Govt. Associate College, Muridke',
    period: '2019 — 2021',
    subjects: 'Mathematics · Physics',
  },
  {
    qualification: 'Matric Computer Science',
    institution: 'Al-Rehman Grammar School, Muridke',
    period: '2017 — 2019',
    subjects: 'Computer Science · Mathematics · Physics',
  },
]

export const languages = [
  { name: 'English', level: 'Professional' },
  { name: 'Urdu', level: 'Native' },
  { name: 'Punjabi', level: 'Native' },
]
