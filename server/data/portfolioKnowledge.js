/**
 * Ground-truth portfolio facts used by the chatbot.
 * Keep answers scoped to this knowledge only.
 */
const portfolioKnowledge = {
  name: 'Muhammad Zohaib',
  shortName: 'Zohaib',
  role: 'Full-Stack Developer & Software Engineer',
  currentRole: 'Full-Stack Developer Intern at HOF-Global',
  status: 'Currently interning at HOF-Global',
  location: 'Lahore, Pakistan',
  email: 'zohaibamjad1003@gmail.com',
  phone: '+92 316 4232384',
  github: 'https://github.com/zohaibamjad1003',
  linkedin: 'https://www.linkedin.com/in/zohaibamjad1003/',
  resumeUrl: 'http://zohaibamjad1003.vercel.app/',
  availability:
    'Focused on the HOF-Global internship and open to conversations about future full-stack and software engineering opportunities.',
  summary:
    'Emerging full-stack web developer with a passion for modern web technologies. Hands-on builder who writes clean code and turns complex problems into simple, elegant solutions. Building CodivZ.',
  experience: [
    {
      role: 'Full-Stack Developer Intern',
      company: 'HOF-Global',
      duration: 'Present',
      highlights: ['Contributing to modern digital products with practical full-stack work.'],
    },
    {
      role: 'WordPress Developer',
      company: 'WPWizards',
      location: 'Lahore, Pakistan',
      duration: '1 year 3 months',
      highlights: [
        'Built pixel-perfect WordPress sites with Elementor.',
        'Strengthened JavaScript through real projects.',
        'Learned React.js for modern web apps.',
      ],
    },
    {
      role: 'WordPress Developer Intern',
      company: 'WPWizards',
      location: 'Lahore, Pakistan',
      duration: '3 months',
      highlights: [
        'Learned JavaScript with HTML/CSS practice.',
        'Converted Figma designs into responsive WordPress pages.',
      ],
    },
    {
      role: 'Development Intern',
      company: 'A2Z Tech',
      location: 'Muridke, Pakistan',
      duration: '2 months',
      highlights: ['Foundational HTML/CSS and CMS content work.'],
    },
  ],
  education: [
    {
      qualification: 'BS Software Engineering',
      institution: 'Virtual University of Pakistan',
      period: '2021 — Present',
    },
    {
      qualification: 'FSc Pre-Engineering',
      institution: 'Govt. Associate College, Muridke',
      period: '2019 — 2021',
    },
    {
      qualification: 'Matric Computer Science',
      institution: 'Al-Rehman Grammar School, Muridke',
      period: '2017 — 2019',
    },
  ],
  projects: [
    {
      title: 'MERN Portfolio',
      description:
        'Animated React portfolio with Express contact API and MongoDB persistence.',
      stack: ['React', 'Express', 'MongoDB', 'Tailwind'],
    },
    {
      title: 'Neurostar',
      description:
        'Responsive NeuroStar TMS therapy website with HTML, CSS, and Bootstrap.',
      stack: ['HTML5', 'CSS3', 'Bootstrap 5'],
      liveUrl: 'https://zohaib1.netlify.app/',
    },
    {
      title: 'WordPress Builds',
      description:
        'Pixel-perfect client sites including Center Peak FS and related Elementor builds.',
      stack: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
      liveUrl: 'https://centerpeakfs.com/',
    },
  ],
  skills: {
    frontend: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'CSS3', 'HTML5'],
    backend: ['Node.js', 'Express.js', 'Supabase', 'MongoDB', 'Payload CMS', 'WordPress', 'Elementor'],
    tools: ['Cursor', 'VS Code', 'Git & GitHub', 'Antigravity', 'npm / pnpm'],
    deploy: ['Vercel', 'Netlify', 'Railway', 'Figma'],
  },
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Urdu', level: 'Native' },
    { name: 'Punjabi', level: 'Native' },
  ],
  socials: {
    github: 'https://github.com/zohaibamjad1003',
    linkedin: 'https://www.linkedin.com/in/zohaibamjad1003/',
    youtube: 'https://www.youtube.com/@MuhammadZohaibAmjad',
    x: 'https://x.com/zohaibamjad1003',
    instagram: 'https://www.instagram.com/zohaib_amjad_1003/',
  },
};

function buildKnowledgePrompt() {
  return `
You are Zohaib's portfolio assistant on his personal website.
Answer ONLY using the facts below. Be concise, friendly, and professional.
If the question is unrelated to Zohaib's profile, politely say you can only help with his work, skills, projects, education, or contact details.
Prefer short paragraphs or tight bullet lists. Do not invent employers, dates, or skills.

PROFILE
- Name: ${portfolioKnowledge.name}
- Role: ${portfolioKnowledge.role}
- Current: ${portfolioKnowledge.currentRole}
- Status: ${portfolioKnowledge.status}
- Location: ${portfolioKnowledge.location}
- Email: ${portfolioKnowledge.email}
- Phone: ${portfolioKnowledge.phone}
- GitHub: ${portfolioKnowledge.github}
- LinkedIn: ${portfolioKnowledge.linkedin}
- Resume: ${portfolioKnowledge.resumeUrl}
- Availability: ${portfolioKnowledge.availability}
- Summary: ${portfolioKnowledge.summary}

EXPERIENCE
${portfolioKnowledge.experience
  .map(
    (item) =>
      `- ${item.role} @ ${item.company} (${item.duration})${item.location ? ` — ${item.location}` : ''}\n  ${item.highlights.join(' ')}`,
  )
  .join('\n')}

EDUCATION
${portfolioKnowledge.education
  .map((item) => `- ${item.qualification}, ${item.institution} (${item.period})`)
  .join('\n')}

PROJECTS
${portfolioKnowledge.projects
  .map(
    (item) =>
      `- ${item.title}: ${item.description} Stack: ${item.stack.join(', ')}${item.liveUrl ? ` Live: ${item.liveUrl}` : ''}`,
  )
  .join('\n')}

SKILLS
- Frontend: ${portfolioKnowledge.skills.frontend.join(', ')}
- Backend & CMS: ${portfolioKnowledge.skills.backend.join(', ')}
- Tools: ${portfolioKnowledge.skills.tools.join(', ')}
- Deploy: ${portfolioKnowledge.skills.deploy.join(', ')}

LANGUAGES
${portfolioKnowledge.languages.map((item) => `- ${item.name} (${item.level})`).join('\n')}
`.trim();
}

module.exports = {
  portfolioKnowledge,
  buildKnowledgePrompt,
};
