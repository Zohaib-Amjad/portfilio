import { useEffect, useMemo, useState } from 'react'

const CMD_SPEED = 70
const FIELD_SPEED = 45

const script = [
  { type: 'cmd', prompt: '~/portfolio', cmd: 'cat profile.json' },
  { type: 'open', text: '{' },
  { type: 'field', key: 'name', val: '"Muhammad Zohaib"', tone: 'str' },
  { type: 'field', key: 'role', val: '"Full-Stack Developer"', tone: 'str' },
  { type: 'field', key: 'stack', val: '"MERN + TypeScript"', tone: 'str' },
  { type: 'field', key: 'location', val: '"Lahore, Pakistan"', tone: 'str' },
  { type: 'field', key: 'status', val: 'shipping: true', tone: 'bool' },
  { type: 'close', text: '}' },
  { type: 'spacer' },
  { type: 'cmd', prompt: '~/portfolio', cmd: 'ls ./skills' },
  {
    type: 'tags',
    items: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'WordPress', 'Supabase'],
  },
]

function withDelays(lines) {
  let delay = 420
  return lines.map((line) => {
    const timed = { ...line, delay }
    if (line.type === 'cmd') delay += line.cmd.length * CMD_SPEED + 180
    else if (line.type === 'field') delay += `"${line.key}": ${line.val},`.length * FIELD_SPEED + 120
    else if (line.type === 'plain') delay += line.text.length * FIELD_SPEED + 120
    else if (line.type === 'open' || line.type === 'close') delay += 100
    else if (line.type === 'spacer') delay += 150
    else if (line.type === 'tags') delay += line.items.length * 110 + 220
    return timed
  })
}

function TypeText({ text, speed, className = '', isTyping, instant = false }) {
  const [shown, setShown] = useState(instant ? text : '')
  const [done, setDone] = useState(instant)

  useEffect(() => {
    if (instant) {
      setShown(text)
      setDone(true)
      return undefined
    }

    let index = 0
    setShown('')
    setDone(false)
    const timer = setInterval(() => {
      index += 1
      setShown(text.slice(0, index))
      if (index >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed, instant])

  return (
    <span className={className}>
      {shown}
      {isTyping && !done && <span className="t-cursor" aria-hidden="true" />}
    </span>
  )
}

export default function HeroTerminal() {
  const lines = useMemo(() => withDelays(script), [])
  const [visible, setVisible] = useState([])
  const [typingIndex, setTypingIndex] = useState(null)
  const [complete, setComplete] = useState(false)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) {
      setVisible(lines.map((_, index) => index))
      setComplete(true)
      return undefined
    }

    const timers = lines.map((line, index) =>
      setTimeout(() => {
        setVisible((current) => [...current, index])
        if (['cmd', 'field', 'plain'].includes(line.type)) {
          setTypingIndex(index)
        }

        if (index === lines.length - 1) {
          const last = lines[index]
          const chars =
            last.type === 'cmd'
              ? last.cmd.length
              : last.type === 'field'
                ? `"${last.key}": ${last.val},`.length
                : last.type === 'plain'
                  ? last.text.length
                  : 0
          const speed = last.type === 'cmd' ? CMD_SPEED : FIELD_SPEED
          setTimeout(() => {
            setTypingIndex(null)
            setComplete(true)
          }, chars * speed + 280)
        }
      }, line.delay),
    )

    return () => timers.forEach(clearTimeout)
  }, [lines, reduceMotion])

  return (
    <div
      className="relative ml-auto hidden w-full max-w-lg lg:block lg:justify-self-end"
      aria-hidden="true"
    >
      <div className="code-window overflow-hidden shadow-[0_28px_65px_rgba(0,0,0,0.28)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a5560]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5d6b74]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-auto font-mono text-[11px] text-muted">zohaib@portfolio — zsh</span>
        </div>

        <div className="min-h-[22rem] space-y-1 overflow-hidden p-6 font-mono text-[13px] leading-7 text-code sm:p-7">
          {lines.map((line, index) => {
            if (!visible.includes(index)) return null

            if (line.type === 'spacer') {
              return <div key={index} className="h-3" />
            }

            if (line.type === 'cmd') {
              return (
                <div key={index} className="flex flex-wrap gap-x-2">
                  <span className="text-accent">
                    {line.prompt} <span className="text-muted">❯</span>
                  </span>
                  <TypeText
                    text={line.cmd}
                    speed={CMD_SPEED}
                    className="text-heading"
                    isTyping={typingIndex === index}
                    instant={reduceMotion}
                  />
                </div>
              )
            }

            if (line.type === 'open' || line.type === 'close') {
              return (
                <div key={index} className="pl-3 text-muted">
                  {line.text}
                </div>
              )
            }

            if (line.type === 'field') {
              return (
                <div key={index} className="pl-6">
                  <TypeText
                    text={`"${line.key}": ${line.val},`}
                    speed={FIELD_SPEED}
                    className={line.tone === 'bool' ? 'text-steel' : 'text-moss'}
                    isTyping={typingIndex === index}
                    instant={reduceMotion}
                  />
                </div>
              )
            }

            if (line.type === 'plain') {
              return (
                <div key={index}>
                  <TypeText
                    text={line.text}
                    speed={FIELD_SPEED}
                    className="text-body"
                    isTyping={typingIndex === index}
                    instant={reduceMotion}
                  />
                </div>
              )
            }

            if (line.type === 'tags') {
              return (
                <div key={index} className="flex flex-wrap gap-2 py-1">
                  {line.items.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className="rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] text-accent animate-[fade-up_420ms_ease_both]"
                      style={{ animationDelay: `${tagIndex * 90}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )
            }

            return null
          })}

          {complete && (
            <div className="flex items-center gap-2 pt-1 text-accent">
              <span>
                ~/portfolio <span className="text-muted">❯</span>
              </span>
              <span className="t-cursor" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute -bottom-6 right-4 rounded-xl border border-accent/25 bg-panel px-5 py-3 font-mono text-xs text-accent shadow-2xl">
        storm_protocol: online
      </div>
    </div>
  )
}
