import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react'

const starters = [
  'What is Zohaib’s stack?',
  'Show his experience',
  'How can I contact him?',
  'What projects has he built?',
]

const welcome = {
  role: 'assistant',
  content:
    'Hi — I’m Zohaib’s portfolio assistant. Ask about his skills, experience, projects, education, or contact details.',
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([welcome])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open, sending])

  const sendMessage = async (rawText) => {
    const text = String(rawText || '').trim()
    if (!text || sending) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setSending(true)
    setError('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(1).map(({ role, content }) => ({ role, content })),
        }),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.message || 'Could not get a reply.')
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: payload.reply || 'No reply received.' },
      ])
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Chat server is offline. Start the API, then try again.'
          : err.message,
      )
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'I couldn’t reach the chat API right now. You can still email zohaibamjad1003@gmail.com.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div
      className="chatbot-root fixed right-4 top-1/2 z-[70] flex -translate-y-1/2 flex-col items-end gap-3 sm:right-6"
      data-rain-ignore
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="chatbot-panel flex w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/95 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            role="dialog"
            aria-label="Portfolio chatbot"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-heading">Ask Zohaib</p>
                  <p className="font-mono text-[10px] text-muted">Portfolio assistant</p>
                </div>
              </div>
              <button
                type="button"
                className="icon-button h-9 w-9"
                aria-label="Close chatbot"
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'bg-accent text-[rgb(var(--color-on-accent))]'
                        : 'border border-white/10 bg-background/70 text-body'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
                  <LoaderCircle size={13} className="animate-spin text-accent" />
                  Thinking…
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-white/10 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="rounded-full border border-white/10 bg-background/50 px-2.5 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    onClick={() => sendMessage(starter)}
                    disabled={sending}
                  >
                    {starter}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about skills, work…"
                  className="field-input h-11 flex-1 rounded-xl py-0 text-sm"
                  maxLength={500}
                  disabled={sending}
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  className="button-primary h-11 shrink-0 px-3"
                  disabled={sending || !input.trim()}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
              {error && <p className="font-mono text-[10px] text-red-400">{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot-fab group relative grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent text-[rgb(var(--color-on-accent))] shadow-glow"
        aria-label={open ? 'Close portfolio chatbot' : 'Open portfolio chatbot'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.15 },
        }}
      >
        <span className="absolute inset-0 rounded-full bg-accent/30 blur-md transition-opacity group-hover:opacity-100" />
        <span className="relative z-[1]">
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </span>
      </motion.button>
    </div>
  )
}
