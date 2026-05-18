import { NextRequest, NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'

export async function POST(req: NextRequest) {
  try {
    const client = sanityWriteClient()
    if (!client) {
      return NextResponse.json({ error: 'Contact submissions are not configured' }, { status: 503 })
    }

    const body = await req.json()
    const { firstName, lastName, email, phone, subject, budgetRange, message, consent } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await client.create({
      _type: 'contactSubmission',
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      budgetRange: budgetRange || undefined,
      message: message || undefined,
      consentGiven: !!consent,
      status: 'new',
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
