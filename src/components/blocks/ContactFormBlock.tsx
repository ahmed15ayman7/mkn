'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface FormBlockProps {
  block: {
    heading?: string
    subjectOptions?: Array<{ label: string; value: string }>
    budgetOptions?: Array<{ label: string; value: string }>
    submitLabel?: string
    successMessage?: string
  }
  locale: string
}

export default function ContactFormBlock({ block }: FormBlockProps) {
  const t = useTranslations('contact.form')
  const { heading, subjectOptions, budgetOptions, submitLabel, successMessage } = block

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    subject: '', budgetRange: '', message: '', consent: false,
  })

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.consent) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-display text-charcoal text-4xl mb-4">{t('successTitle')}</p>
          <p className="text-charcoal/60">{successMessage || t('successMessage')}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {heading && (
          <h2 className="font-display text-charcoal text-4xl mb-10">{heading}</h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('firstName')}</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                placeholder={t('firstName')}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('lastName')}</label>
              <input
                required
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                placeholder={t('lastName')}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('email')}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder={t('email')}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('phone')}</label>
              <input
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder={t('phone')}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
          {subjectOptions?.length ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('subject')}</label>
              <select
                value={form.subject}
                onChange={(e) => set('subject', e.target.value)}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              >
                <option value="">{t('chooseSubject')}</option>
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ) : null}

          {/* Budget */}
          {budgetOptions?.length ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('budget')}</label>
              <select
                value={form.budgetRange}
                onChange={(e) => set('budgetRange', e.target.value)}
                className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors"
              >
                <option value="">—</option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ) : null}

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wide text-charcoal/60 uppercase">{t('message')}</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder={t('message')}
              className="border-b border-charcoal/20 py-3 text-sm bg-transparent focus:outline-none focus:border-charcoal transition-colors resize-none"
            />
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-1 accent-tan"
            />
            <span className="text-xs text-charcoal/50">{t('consent')}</span>
          </label>

          <button
            type="submit"
            disabled={!form.consent || status === 'loading'}
            className="bg-charcoal text-white px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '…' : (submitLabel || t('submit'))}
          </button>

          {status === 'error' && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}
