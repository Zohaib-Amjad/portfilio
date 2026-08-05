import portfolioPreview from '../assets/projects/portfolio.webp'
import neurostarPreview from '../assets/projects/neurostar.webp'
import centerpeakPreview from '../assets/projects/centerpeak.webp'

export const projects = [
  {
    number: '01',
    title: 'MERN Portfolio',
    description:
      'This responsive portfolio: an animated React interface backed by an Express contact API and MongoDB persistence.',
    technologies: ['React', 'Express', 'MongoDB', 'Tailwind'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/zohaibamjad1003',
    image: portfolioPreview,
  },
  {
    number: '02',
    title: 'Neurostar',
    description:
      'A responsive NeuroStar TMS therapy website built with semantic HTML, CSS, and Bootstrap — focused on clear layout, accessibility, and practical frontend delivery.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5'],
    liveUrl: 'https://zohaib1.netlify.app/',
    githubUrl: 'https://github.com/zohaibamjad1003',
    image: neurostarPreview,
  },
  {
    number: '03',
    title: 'WordPress Builds',
    description:
      'Pixel-perfect business and financial websites delivered with Elementor, including Center Peak FS, LEWM LLC, Upgrow, and related client builds.',
    technologies: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
    featured: true,
    liveUrl: 'https://centerpeakfs.com/',
    image: centerpeakPreview,
  },
]
