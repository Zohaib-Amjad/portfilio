import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import SocialLinks from './SocialLinks'
import { profile } from '../data/profile'

const initialForm = { name: '', email: '', message: '' }
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

function loadRecaptchaScript() {
  if (!RECAPTCHA_SITE_KEY || window.grecaptcha) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-recaptcha]')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.dataset.recaptcha = 'true'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [captchaReady, setCaptchaReady] = useState(!RECAPTCHA_SITE_KEY)
  const captchaRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return undefined

    let cancelled = false

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !captchaRef.current || widgetIdRef.current !== null) return
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: document.documentElement.classList.contains('light') ? 'light' : 'dark',
        })
        setCaptchaReady(true)
      })
      .catch(() => {
        if (!cancelled) {
          setStatus({
            type: 'error',
            message: 'reCAPTCHA failed to load. Refresh and try again.',
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const updateField = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus({ type: '', message: '' })
    setFieldErrors({})

    const recaptchaToken = RECAPTCHA_SITE_KEY
      ? window.grecaptcha?.getResponse(widgetIdRef.current ?? undefined)
      : 'dev-bypass'

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setFieldErrors({ recaptcha: 'Please complete the reCAPTCHA check.' })
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      })
      const payload = await response.json()

      if (!response.ok) {
        const errors = Object.fromEntries(
          (payload.errors || []).map((error) => [error.field, error.message]),
        )
        setFieldErrors(errors)
        throw new Error(payload.message || 'Your message could not be sent.')
      }

      setForm(initialForm)
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current ?? undefined)
      }
      setStatus({ type: 'success', message: payload.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof TypeError
            ? 'The server is unavailable. Please email me directly.'
            : error.message,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-space border-t border-white/5 bg-surface/30">
      <div className="container-shell">
        <SectionHeading
          label="Contact"
          title="Let’s build something."
          description="Have a product idea, a full-stack engineering challenge, or a project that needs momentum? Tell me about it."
        />

        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="max-w-sm leading-8 text-muted">
              {profile.availability}
            </p>
            <div className="mt-8 space-y-4">
              <ContactDetail
                icon={Mail}
                label={profile.email}
                href={`mailto:${profile.email}`}
              />
              <ContactDetail
                icon={Phone}
                label={profile.phone}
                href={`tel:${profile.phone.replaceAll(' ', '')}`}
              />
              <ContactDetail icon={MapPin} label={profile.location} />
            </div>

            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[.2em] text-muted">
                Social
              </p>
              <SocialLinks />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            onSubmit={submitForm}
            className="panel grid gap-6 p-6 sm:grid-cols-2 sm:p-9"
            noValidate
          >
            <Field
              label="Your name"
              name="name"
              value={form.name}
              onChange={updateField}
              error={fieldErrors.name}
              autoComplete="name"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              error={fieldErrors.email}
              autoComplete="email"
            />
            <div className="sm:col-span-2">
              <label htmlFor="message" className="field-label">Project details</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={updateField}
                className={`field-input resize-none ${fieldErrors.message ? 'border-red-400/60' : ''}`}
                placeholder="What are you building, and how can I help?"
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                required
              />
              {fieldErrors.message && <p id="message-error" className="field-error">{fieldErrors.message}</p>}
            </div>

            {RECAPTCHA_SITE_KEY ? (
              <div className="sm:col-span-2">
                <div ref={captchaRef} className="g-recaptcha" />
                {fieldErrors.recaptcha && (
                  <p className="field-error">{fieldErrors.recaptcha}</p>
                )}
                {!captchaReady && (
                  <p className="font-mono text-[10px] text-muted">Loading reCAPTCHA…</p>
                )}
              </div>
            ) : (
              <p className="font-mono text-[10px] text-faint sm:col-span-2">
                Set `VITE_RECAPTCHA_SITE_KEY` to enable reCAPTCHA in production.
              </p>
            )}

            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              <p className="hidden font-mono text-[10px] text-muted sm:block">Replies usually within 1–2 days.</p>
              <button type="submit" disabled={submitting} className="button-primary ml-auto disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? (
                  <>Sending <LoaderCircle size={17} className="animate-spin" /></>
                ) : (
                  <>Send message <Send size={16} /></>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <Toast status={status} onClose={() => setStatus({ type: '', message: '' })} />
    </section>
  )
}

function ContactDetail({ icon: Icon, label, href }) {
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
        <Icon size={18} />
      </span>
      <span className="break-all">{label}</span>
    </>
  )

  return href ? (
    <a
      href={href}
      className="flex items-center gap-3 font-mono text-xs text-heading transition-colors hover:text-accent"
    >
      {content}
    </a>
  ) : (
    <p className="flex items-center gap-3 font-mono text-xs text-muted">{content}</p>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, autoComplete }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`field-input ${error ? 'border-red-400/60' : ''}`}
        placeholder={type === 'email' ? 'you@example.com' : 'Your name'}
        aria-describedby={error ? `${name}-error` : undefined}
        required
      />
      {error && <p id={`${name}-error`} className="field-error">{error}</p>}
    </div>
  )
}

function Toast({ status, onClose }) {
  return (
    <AnimatePresence>
      {status.message && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 12, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-md items-start gap-3 rounded-2xl border border-white/10 bg-panel p-4 shadow-2xl"
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={19} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={19} />
          )}
          <p className="flex-1 text-sm leading-6 text-body">{status.message}</p>
          <button type="button" onClick={onClose} aria-label="Dismiss notification" className="text-muted hover:text-heading">
            <X size={17} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
