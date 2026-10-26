import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from 'react'
import {
  ArrowUpRight,
  Check,
  Envelope,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { SOCIAL } from '@/data/social'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

type FormState = {
  name: string
  email: string
  message: string
  company: string
}

type Status =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error'
  | 'unconfigured'
  | 'blocked'
  | 'cooldown'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESUBMIT_COOLDOWN_MS = 30_000
const LAST_SUBMIT_KEY = 'ecnivs-contact-last-submit'
const subscribeReadiness = () => () => {}

const inputClasses =
  'w-full rounded-none border border-border bg-surface/60 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] duration-200 focus:border-accent/60 focus:outline-none focus:ring-4 focus:ring-accent/10'

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [status, setStatus] = useState<Status>('idle')
  const ready = useSyncExternalStore(
    subscribeReadiness,
    () => true,
    () => false,
  )
  const configured = Boolean(import.meta.env.VITE_INQUIRY_ENDPOINT)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)
  const posting = useRef(false)

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus()
  }, [status])

  function validate(form: FormState): boolean {
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
    if (!ready || posting.current) return
    const fields = new FormData(event.currentTarget)
    const form: FormState = {
      name: String(fields.get('name') ?? ''),
      email: String(fields.get('email') ?? ''),
      message: String(fields.get('message') ?? ''),
      company: String(fields.get('company') ?? ''),
    }
    if (!validate(form)) return

    let lastSubmit = 0
    try {
      lastSubmit = Number(sessionStorage.getItem(LAST_SUBMIT_KEY) ?? 0)
    } catch {
      // Optional duplicate detection must not block a message when storage is restricted.
    }
    const isBot = form.company.trim().length > 0
    const isThrottled = Date.now() - lastSubmit < RESUBMIT_COOLDOWN_MS

    if (isBot) {
      setStatus('blocked')
      return
    }

    if (isThrottled) {
      setStatus('cooldown')
      return
    }

    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT
    if (!endpoint) {
      setStatus('unconfigured')
      return
    }

    posting.current = true
    setStatus('submitting')
    try {
      const { company: _company, ...payload } = form
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Request failed')
      try {
        sessionStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()))
      } catch {
        // Delivery already succeeded; unavailable browser storage must not reverse it.
      }
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      posting.current = false
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="contact-section">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background">
            <Check size={20} weight="bold" className="text-accent" />
          </div>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-6 text-3xl font-semibold tracking-tight text-foreground outline-none"
          >
            Received
          </h2>
          <p role="status" className="mt-4 text-muted-foreground">
            Thanks for reaching out. We’ll reply at the email address you gave
            us.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-layout mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Got an idea?
          </h2>
          <p className="mt-4 text-muted-foreground">
            A freelance project, a contract, a collaboration, or a video idea.
            Tell us what you have in mind.
          </p>
          <div className="contact-direct">
            <a
              className="editorial-link"
              href="https://wa.me/919233429872"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappLogo size={20} aria-hidden="true" /> WhatsApp
            </a>
            <a className="editorial-link" href="mailto:hello@ecnivs.com">
              <Envelope size={20} aria-hidden="true" /> Email
            </a>
            <a
              className="editorial-link"
              href={SOCIAL.contra}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={20} aria-hidden="true" /> Contra
            </a>
            <a
              className="editorial-link"
              href={SOCIAL.upwork}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={20} aria-hidden="true" /> Upwork
            </a>
          </div>
        </Reveal>

        {configured ? (
          <Reveal delay={0.08} className="contact-form">
            <noscript>
              <style>{`.contact-form { display: none; }`}</style>
            </noscript>
            <form
              method="post"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === 'submitting'}
            >
              <fieldset
                disabled={status === 'submitting'}
                className="space-y-6"
              >
                <legend className="sr-only">Send a message</legend>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                <Field label="Name" htmlFor="name" error={errors.name}>
                  <input
                    ref={nameRef}
                    id="name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    defaultValue=""
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
                    name="email"
                    autoComplete="email"
                    type="email"
                    defaultValue=""
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={cn(
                      inputClasses,
                      errors.email && 'border-danger',
                    )}
                  />
                </Field>

                <Field label="Message" htmlFor="message" error={errors.message}>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue=""
                    placeholder="What’s on your mind?"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
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
                    This form is unavailable. Email{' '}
                    <a
                      href="mailto:hello@ecnivs.com"
                      className="text-accent hover:underline"
                    >
                      hello@ecnivs.com
                    </a>
                    .
                  </p>
                )}

                {(status === 'blocked' || status === 'cooldown') && (
                  <p
                    role="alert"
                    className="border border-border bg-surface px-4 py-3 text-sm text-muted-foreground"
                  >
                    {status === 'cooldown'
                      ? 'Please wait 30 seconds between messages. This message has not been sent.'
                      : 'This message could not be submitted. Please email hello@ecnivs.com directly.'}
                  </p>
                )}

                {status === 'error' && (
                  <p
                    role="alert"
                    className="rounded-xl border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
                  >
                    The message did not send. Try again, or email us directly at{' '}
                    <a
                      href="mailto:hello@ecnivs.com"
                      className="hover:underline"
                    >
                      hello@ecnivs.com
                    </a>
                    .
                  </p>
                )}

                <div className="inline-flex">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!ready || status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending' : 'Send message'}
                  </Button>
                </div>
              </fieldset>
            </form>
          </Reveal>
        ) : (
          <div className="contact-email">
            <a href="mailto:hello@ecnivs.com">
              hello@
              <br />
              ecnivs.com
              <ArrowUpRight size={32} aria-hidden="true" />
            </a>
            <p>Tell us what you’re making.</p>
          </div>
        )}
      </div>
    </section>
  )
}
