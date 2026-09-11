import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

type FormState = {
  name: string
  email: string
  message: string
  company: string
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  message: '',
  company: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SUBMIT_MS = 2500
const RESUBMIT_COOLDOWN_MS = 30_000
const LAST_SUBMIT_KEY = 'ecnivs-contact-last-submit'

const inputClasses =
  'w-full rounded-xl border border-border bg-surface/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:outline-none focus:ring-4 focus:ring-accent/10'

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 text-sm text-danger"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(0)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus()
  }, [status])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Tell us who this is from.'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Give us a sentence or two.'
    }
    setErrors(nextErrors)

    if (nextErrors.name) nameRef.current?.focus()
    else if (nextErrors.email) emailRef.current?.focus()
    else if (nextErrors.message) messageRef.current?.focus()

    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    const lastSubmit = Number(sessionStorage.getItem(LAST_SUBMIT_KEY) ?? 0)
    const isBot =
      form.company.trim().length > 0 ||
      Date.now() - mountedAt.current < MIN_SUBMIT_MS
    const isThrottled = Date.now() - lastSubmit < RESUBMIT_COOLDOWN_MS

    if (isBot) {
      setStatus('success')
      setForm(INITIAL_STATE)
      return
    }

    if (isThrottled) {
      setStatus('success')
      return
    }

    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT
    if (!endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      const { company: _company, ...payload } = form
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Request failed')
      sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()))
      setStatus('success')
      setForm(INITIAL_STATE)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="border-t border-border/60 py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background">
            <Check size={20} weight="bold" className="text-accent" />
          </div>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            role="status"
            className="mt-6 text-3xl font-semibold tracking-tight text-foreground outline-none"
          >
            Received.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We read every message ourselves. Expect a reply at the address you
            gave us.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="border-t border-border/60 py-28">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="font-mono-brand text-xs tracking-[0.2em] text-accent uppercase">
            Get in touch
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Say hello.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Questions about what we build, or something else entirely. We read
            every message ourselves.
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mt-10 rounded-2xl border border-border bg-background"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 p-8 sm:p-10"
          >
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) => update('company', event.target.value)}
              />
            </div>

            <Field label="Name" htmlFor="name" error={errors.name}>
              <input
                ref={nameRef}
                id="name"
                type="text"
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="Your name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={cn(inputClasses, errors.name && 'border-danger')}
              />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email}>
              <input
                ref={emailRef}
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
                placeholder="you@company.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={cn(inputClasses, errors.email && 'border-danger')}
              />
            </Field>

            <Field label="Message" htmlFor="message" error={errors.message}>
              <textarea
                ref={messageRef}
                id="message"
                rows={5}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                placeholder="What's on your mind"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={cn(
                  inputClasses,
                  'resize-none',
                  errors.message && 'border-danger',
                )}
              />
            </Field>

            {status === 'unconfigured' && (
              <p
                role="alert"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
              >
                We are not able to take messages through this form right now.
                Email us directly at{' '}
                <a
                  href="mailto:hello@ecnivs.com"
                  className="text-accent hover:underline"
                >
                  hello@ecnivs.com
                </a>{' '}
                and we will pick it up from there.
              </p>
            )}

            {status === 'error' && (
              <p
                role="alert"
                className="rounded-xl border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
              >
                The message did not send. Try again, or email us directly at{' '}
                <a href="mailto:hello@ecnivs.com" className="hover:underline">
                  hello@ecnivs.com
                </a>
                .
              </p>
            )}

            <Magnetic strength={0.2}>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending' : 'Send message'}
              </Button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
