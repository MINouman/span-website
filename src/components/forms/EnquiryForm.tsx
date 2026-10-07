'use client'

// Enquiry form (spec §3.9): name, phone (required), email (optional), message, hidden project field,
// honeypot. The landowner variant adds land location (required) and approximate size.
// Inline validation with specific errors tied to each field, and a clear success state.
// Step 4 adds Cloudflare Turnstile and the working /api/enquiry endpoint.
import { useId, useState, type FormEvent } from 'react'

import { Icon } from '@/components/ui/Icon'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'

type EnquiryFormProps = {
  labels: Dictionary['enquiry']
  type?: 'buyer' | 'landowner' | 'general'
  project?: { slug: string; title: string }
  /** Light pages: add a border so the white form stands off the canvas. */
  bordered?: boolean
  /** 'card': white panel (default). 'plain': open fields on the page, full-width button (Contact). */
  variant?: 'card' | 'plain'
  /** Ask the visitor to agree to be contacted, with a link to the privacy note. */
  requireConsent?: boolean
  privacyHref?: string
}

type Field = 'name' | 'phone' | 'email' | 'message' | 'landLocation' | 'landSize'
type Errors = Partial<Record<Field, string>>

// Bangladeshi mobile (01XXXXXXXXX, optional +880/880) or any international number of 8–15 digits.
const PHONE = /^(?:\+?880|0)1[3-9]\d{8}$|^\+?\d{8,15}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
  values: Record<Field, string>,
  labels: Dictionary['enquiry'],
  type: EnquiryFormProps['type'],
): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = labels.nameRequired
  const phone = values.phone.replace(/[\s-]/g, '')
  if (!phone) errors.phone = labels.phoneRequired
  else if (!PHONE.test(phone)) errors.phone = labels.phoneInvalid
  if (values.email.trim() && !EMAIL.test(values.email.trim())) errors.email = labels.emailInvalid
  if (type === 'landowner' && !values.landLocation.trim())
    errors.landLocation = labels.landLocationRequired
  return errors
}

const inputClass =
  'block w-full rounded-control border bg-surface px-4 text-body text-ink placeholder:text-muted/80 aria-[invalid=true]:border-amber-text aria-[invalid=true]:border-2'

export function EnquiryForm({
  labels,
  type = 'buyer',
  project,
  bordered = false,
  variant = 'card',
  requireConsent = false,
  privacyHref = '/privacy',
}: EnquiryFormProps) {
  const plain = variant === 'plain'
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const landowner = type === 'landowner'
  const uid = useId()
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    phone: '',
    email: '',
    message: '',
    landLocation: '',
    landSize: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const id = (f: Field) => `${uid}-${f}`
  const errorId = (f: Field) => `${uid}-${f}-error`

  // Show or clear the error for one field only, so leaving a field never flags fields not yet reached.
  const checkField = (field: Field, current = values) => {
    const message = validate(current, labels, type)[field]
    setErrors((prev) => {
      const next = { ...prev }
      if (message) next[field] = message
      else delete next[field]
      return next
    })
  }

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Re-validate a field the visitor has already left, so the error clears as soon as it is fixed.
    if (touched[field]) checkField(field, next)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values, labels, type)
    setErrors(found)
    setTouched({ name: true, phone: true, email: true, landLocation: true })
    const missingConsent = requireConsent && !consent
    setConsentError(missingConsent)
    const first = (Object.keys(found) as Field[])[0]
    if (first) {
      document.getElementById(id(first))?.focus()
      return
    }
    if (missingConsent) {
      document.getElementById(`${uid}-consent`)?.focus()
      return
    }

    setState('sending')
    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name: values.name,
          phone: values.phone,
          email: values.email,
          message: values.message,
          ...(landowner ? { landLocation: values.landLocation, landSize: values.landSize } : {}),
          consent: requireConsent ? consent : undefined,
          project: project?.slug ?? null,
          sourcePage: window.location.pathname,
          website: form.get('website'),
        }),
      })
      setState(response.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div
        role="status"
        className={`rounded-card bg-surface p-6 text-ink lg:p-8 ${bordered ? 'border border-stone' : ''}`}
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-amber-tint text-amber-text">
          <Icon name="check" />
        </span>
        <p className="mt-4 text-h3">{labels.successTitle}</p>
        <p className="mt-2 text-body text-muted">{labels.successBody}</p>
      </div>
    )
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={errorId(f)} className="mt-2 flex items-start gap-1.5 text-small text-amber-text">
        <Icon name="alert" size={18} className="mt-px" />
        {errors[f]}
      </p>
    ) : null

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={
        plain
          ? 'relative text-ink'
          : `relative rounded-card bg-surface p-5 text-ink lg:p-8 ${bordered ? 'border border-stone' : ''}`
      }
    >
      {project ? (
        <p className="mb-6 inline-flex rounded-full bg-canvas px-4 py-2 text-small">
          {fillTemplate(labels.about, { project: project.title })}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="text-small font-semibold">
            {labels.name}
          </label>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, name: true }))
              checkField('name')
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
            required
            className={`mt-2 h-12 border-muted ${inputClass}`}
          />
          {fieldError('name')}
        </div>

        <div>
          <label htmlFor={id('phone')} className="text-small font-semibold">
            {labels.phone}
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, phone: true }))
              checkField('phone')
            }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId('phone') : undefined}
            required
            className={`mt-2 h-12 border-muted tabular ${inputClass}`}
          />
          {fieldError('phone')}
        </div>

        <div className="md:col-span-2">
          <label htmlFor={id('email')} className="text-small font-semibold">
            {labels.email} <span className="font-normal text-muted">({labels.optional})</span>
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, email: true }))
              checkField('email')
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={`mt-2 h-12 border-muted ${inputClass}`}
          />
          {fieldError('email')}
        </div>

        {landowner ? (
          <>
            <div>
              <label htmlFor={id('landLocation')} className="text-small font-semibold">
                {labels.landLocation}
              </label>
              <input
                id={id('landLocation')}
                name="landLocation"
                value={values.landLocation}
                placeholder={labels.landLocationPlaceholder}
                onChange={(e) => update('landLocation', e.target.value)}
                onBlur={() => {
                  setTouched((t) => ({ ...t, landLocation: true }))
                  checkField('landLocation')
                }}
                aria-invalid={Boolean(errors.landLocation)}
                aria-describedby={errors.landLocation ? errorId('landLocation') : undefined}
                required
                className={`mt-2 h-12 border-muted ${inputClass}`}
              />
              {fieldError('landLocation')}
            </div>
            <div>
              <label htmlFor={id('landSize')} className="text-small font-semibold">
                {labels.landSize}{' '}
                <span className="font-normal text-muted">({labels.optional})</span>
              </label>
              <input
                id={id('landSize')}
                name="landSize"
                inputMode="decimal"
                value={values.landSize}
                placeholder={labels.landSizePlaceholder}
                onChange={(e) => update('landSize', e.target.value)}
                className={`mt-2 h-12 border-muted tabular ${inputClass}`}
              />
            </div>
          </>
        ) : null}

        <div className="md:col-span-2">
          <label htmlFor={id('message')} className="text-small font-semibold">
            {labels.message} <span className="font-normal text-muted">({labels.optional})</span>
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={4}
            value={values.message}
            placeholder={
              landowner
                ? labels.landownerMessagePlaceholder
                : type === 'general'
                  ? labels.generalMessagePlaceholder
                  : labels.messagePlaceholder
            }
            onChange={(e) => update('message', e.target.value)}
            className={`mt-2 resize-y border-muted py-3 ${inputClass}`}
          />
        </div>
      </div>

      {requireConsent ? (
        <div className="mt-6">
          <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3">
            <input
              id={`${uid}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (e.target.checked) setConsentError(false)
              }}
              aria-invalid={consentError}
              aria-describedby={consentError ? `${uid}-consent-error` : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--ink)]"
            />
            <span className="text-small">
              {labels.consentLabel}{' '}
              <a
                href={privacyHref}
                className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
              >
                {labels.consentLink}
              </a>
            </span>
          </label>
          {consentError ? (
            <p
              id={`${uid}-consent-error`}
              className="mt-2 flex items-start gap-1.5 text-small text-amber-text"
            >
              <Icon name="alert" size={18} className="mt-px" />
              {labels.consentRequired}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot: hidden from people, filled in by simple bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === 'error' ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-control bg-amber-tint p-4 text-small text-ink"
        >
          <Icon name="alert" size={20} className="shrink-0 text-amber-text" />
          {labels.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === 'sending'}
        className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-control bg-amber px-6 text-body font-semibold text-ink transition-[filter,transform] hover:brightness-95 active:scale-[0.98] disabled:opacity-60 ${plain ? '' : 'md:w-auto'}`}
      >
        {state === 'sending' ? labels.sending : labels.submit}
      </button>
    </form>
  )
}
