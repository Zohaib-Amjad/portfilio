import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          data-rain-ignore
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-4 z-[65] grid h-12 w-12 place-items-center rounded-full border border-accent/35 bg-panel/95 text-accent shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-accent/60 hover:bg-accent hover:text-[rgb(var(--color-on-accent))] sm:bottom-6 sm:right-6"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
