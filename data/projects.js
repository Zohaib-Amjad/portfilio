import hofglobalPreview from '@/assets/projects/hofglobal.webp'
import portfolioPreview from '@/assets/projects/portfolio.webp'
import neurostarPreview from '@/assets/projects/neurostar.webp'
import centerpeakPreview from '@/assets/projects/centerpeak.webp'
import { assetUrl } from '@/lib/assetUrl'

export const projects = [
  {
    number: '01',
    title: 'HOF Global',
    description:
      'Company website for HOF Global — IT solutions, BPO, and tech recruitment under one roof. Built and iterated during my full-stack internship.',
    technologies: ['Next.js', 'React', 'Tailwind'],
    featured: true,
    liveUrl: 'https://hof-global.com/',
    image: assetUrl(hofglobalPreview),
  },
  {
    number: '02',
    title: 'Next.js Portfolio',
    description:
      'This responsive portfolio: an animated Next.js interface with contact API routes and MongoDB persistence.',
    technologies: ['Next.js', 'React', 'MongoDB', 'Tailwind'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/Zohaib-Amjad',
    image: assetUrl(portfolioPreview),
  },
  {
    number: '03',
    title: 'Neurostar',
    description:
      'A responsive NeuroStar TMS therapy website built with semantic HTML, CSS, and Bootstrap — focused on clear layout, accessibility, and practical frontend delivery.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5'],
    liveUrl: 'https://zohaib1.netlify.app/',
    githubUrl: 'https://github.com/Zohaib-Amjad',
    image: assetUrl(neurostarPreview),
  },
  {
    number: '04',
    title: 'WordPress Builds',
    description:
      'Pixel-perfect business and financial websites delivered with Elementor, including Center Peak FS, LEWM LLC, Upgrow, and related client builds.',
    technologies: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
    liveUrl: 'https://centerpeakfs.com/',
    image: assetUrl(centerpeakPreview),
  },
]
