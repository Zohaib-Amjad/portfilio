'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import GithubActivity from '@/components/GithubActivity'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import BackToTop from '@/components/BackToTop'

export default function HomeClient() {
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Skills />
          <GithubActivity />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
      <Chatbot />
      <BackToTop />
    </>
  )
}
