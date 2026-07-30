import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="storm-backdrop" aria-hidden="true">
        <div className="storm-clouds storm-clouds-back" />
        <div className="storm-clouds storm-clouds-front" />
        <div className="lightning-flash" />
        <ThunderBolt className="thunder-bolt-one" />
        <ThunderBolt className="thunder-bolt-two" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
      <div className="rain-layer rain-layer-back" aria-hidden="true" />
      <div className="rain-layer rain-layer-front" aria-hidden="true" />
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

export default App
