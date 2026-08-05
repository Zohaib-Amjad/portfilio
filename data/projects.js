import portfolioPreview from '@/assets/projects/portfolio.webp'
import neurostarPreview from '@/assets/projects/neurostar.webp'
import centerpeakPreview from '@/assets/projects/centerpeak.webp'
import { assetUrl } from '@/lib/assetUrl'

export const projects = [
  {
    number: '01',
    title: 'Next.js Portfolio',
    description:
      'This responsive portfolio: an animated Next.js interface with contact API routes and MongoDB persistence.',
    technologies: ['Next.js', 'React', 'MongoDB', 'Tailwind'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/zohaibamjad1003',
    image: assetUrl(portfolioPreview),
  },
  {
    number: '02',
    title: 'Neurostar',
    description:
      'A responsive NeuroStar TMS therapy website built with semantic HTML, CSS, and Bootstrap — focused on clear layout, accessibility, and practical frontend delivery.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5'],
    liveUrl: 'https://zohaib1.netlify.app/',
    githubUrl: 'https://github.com/zohaibamjad1003',
    image: assetUrl(neurostarPreview),
  },
  {
    number: '03',
    title: 'WordPress Builds',
    description:
      'Pixel-perfect business and financial websites delivered with Elementor, including Center Peak FS, LEWM LLC, Upgrow, and related client builds.',
    technologies: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
    featured: true,
    liveUrl: 'https://centerpeakfs.com/',
    image: assetUrl(centerpeakPreview),
  },
]
