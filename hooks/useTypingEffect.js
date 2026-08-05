import { useEffect, useState } from 'react'

/**
 * Cycles through a set of phrases with a type-and-delete terminal effect.
 */
export function useTypingEffect(words, typingSpeed = 90, pause = 1300) {
  const [wordIndex, setWordIndex] = useState(0)
  const [value, setValue] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const isComplete = value === word
    const isEmpty = value === ''
    const delay = isComplete && !deleting ? pause : deleting ? typingSpeed / 2 : typingSpeed

    const timer = window.setTimeout(() => {
      if (isComplete && !deleting) {
        setDeleting(true)
        return
      }

      if (isEmpty && deleting) {
        setDeleting(false)
        setWordIndex((current) => (current + 1) % words.length)
        return
      }

      setValue(word.slice(0, value.length + (deleting ? -1 : 1)))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, pause, typingSpeed, value, wordIndex, words])

  return value
}
