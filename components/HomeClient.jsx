'use client'

import { useRef, useState } from 'react'
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
import RainCanvas from '@/components/RainCanvas'
import WeatherAudio from '@/components/WeatherAudio'
import Chatbot from '@/components/Chatbot'
import BackToTop from '@/components/BackToTop'

export default function HomeClient() {
  const weatherAudioRef = useRef(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [soundVolume, setSoundVolume] = useState(0.65)

  const toggleSound = async () => {
    if (soundEnabled) {
      weatherAudioRef.current?.disable()
      setSoundEnabled(false)
      return
    }

    const nextVolume = soundVolume === 0 ? 0.5 : soundVolume
    if (nextVolume !== soundVolume) setSoundVolume(nextVolume)
    weatherAudioRef.current?.setVolume(nextVolume)
    const enabled = await weatherAudioRef.current?.enable()
    if (enabled) setSoundEnabled(true)
  }

  const updateSoundVolume = async (value) => {
    setSoundVolume(value)
    weatherAudioRef.current?.setVolume(value)

    if (value === 0) {
      weatherAudioRef.current?.disable()
      setSoundEnabled(false)
      return
    }

    if (!soundEnabled) {
      const enabled = await weatherAudioRef.current?.enable()
      if (enabled) setSoundEnabled(true)
    }
  }

  const triggerThunderSound = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    window.dispatchEvent(new Event('weather-thunder'))
  }

  return (
    <>
      <div className="storm-backdrop" aria-hidden="true">
        <div className="storm-clouds storm-clouds-back" />
        <div className="storm-clouds storm-clouds-front" />
        <div
          className="lightning-flash"
          onAnimationStart={triggerThunderSound}
          onAnimationIteration={triggerThunderSound}
        />
        <ThunderBolt className="thunder-bolt-one" />
        <ThunderBolt className="thunder-bolt-two" />
      </div>
      <div className="relative z-10">
        <Navbar
          soundEnabled={soundEnabled}
          soundVolume={soundVolume}
          onSoundToggle={toggleSound}
          onSoundVolumeChange={updateSoundVolume}
        />
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
      <RainCanvas />
      <WeatherAudio ref={weatherAudioRef} />
      <Chatbot />
      <BackToTop />
    </>
  )
}

function ThunderBolt({ className }) {
  return (
    <svg
      className={`thunder-bolt ${className}`}
      viewBox="0 0 90 360"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M46 0 31 94l21 24-32 91 24 22-18 129 45-151-24-23 29-88-20-23L46 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
