import {
  Braces,
  Code2,
  Database,
  GitBranch,
  LayoutTemplate,
  PenTool,
  PanelsTopLeft,
  ServerCog,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'

export const skillGroups = [
  {
    title: 'Frontend',
    index: '01',
    skills: [
      { name: 'Next.js', icon: PanelsTopLeft },
      { name: 'React', icon: Braces },
      { name: 'TypeScript', icon: Code2 },
      { name: 'JavaScript', icon: Braces },
      { name: 'Tailwind CSS', icon: Sparkles },
      { name: 'Bootstrap', icon: LayoutTemplate },
      { name: 'CSS3', icon: PenTool },
      { name: 'HTML5', icon: Code2 },
    ],
  },
  {
    title: 'Backend & CMS',
    index: '02',
    skills: [
      { name: 'Node.js', icon: ServerCog },
      { name: 'Express.js', icon: TerminalSquare },
      { name: 'Supabase', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Payload CMS', icon: LayoutTemplate },
      { name: 'WordPress', icon: PanelsTopLeft },
      { name: 'Elementor', icon: LayoutTemplate },
    ],
  },
  {
    title: 'Editors & Tools',
    index: '03',
    skills: [
      { name: 'Cursor', icon: TerminalSquare },
      { name: 'VS Code', icon: Code2 },
      { name: 'Git & GitHub', icon: GitBranch },
      { name: 'Chrome DevTools', icon: PanelsTopLeft },
      { name: 'npm / pnpm', icon: TerminalSquare },
      { name: 'Testing & Debugging', icon: Sparkles },
    ],
  },
  {
    title: 'Deployment & Workflow',
    index: '04',
    skills: [
      { name: 'Vercel', icon: TerminalSquare },
      { name: 'Netlify', icon: TerminalSquare },
      { name: 'Railway', icon: ServerCog },
      { name: 'Figma', icon: PenTool },
      { name: 'Communication', icon: Braces },
      { name: 'Teamwork', icon: GitBranch },
    ],
  },
]
