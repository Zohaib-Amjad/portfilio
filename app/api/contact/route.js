import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Message from '@/lib/models/Message'
import { verifyRecaptcha } from '@/lib/recaptcha'

function validateContact(body) {
  const errors = []
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const message = String(body?.message || '').trim()
  const recaptchaToken = body?.recaptchaToken

  if (!name) errors.push({ field: 'name', message: 'Name is required.' })
  else if (name.length > 80) {
    errors.push({ field: 'name', message: 'Name must be 80 characters or fewer.' })
  }

  if (!email) errors.push({ field: 'email', message: 'Email is required.' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' })
  } else if (email.length > 254) {
    errors.push({ field: 'email', message: 'Email must be 254 characters or fewer.' })
  }

  if (!message) errors.push({ field: 'message', message: 'Message is required.' })
  else if (message.length < 10 || message.length > 2000) {
    errors.push({
      field: 'message',
      message: 'Message must be between 10 and 2,000 characters.',
    })
  }

  if (recaptchaToken != null && typeof recaptchaToken !== 'string') {
    errors.push({ field: 'recaptcha', message: 'Invalid reCAPTCHA token.' })
  }

  return {
    errors,
    data: { name, email, message, recaptchaToken },
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { errors, data } = validateContact(body)

    if (errors.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please check the highlighted fields.',
          errors,
        },
        { status: 422 },
      )
    }

    const captcha = await verifyRecaptcha(data.recaptchaToken)
    if (!captcha.ok) {
      return NextResponse.json(
        {
          success: false,
          message: captcha.message,
          errors: [{ field: 'recaptcha', message: captcha.message }],
        },
        { status: 422 },
      )
    }

    await connectDB()
    const savedMessage = await Message.create({
      name: data.name,
      email: data.email,
      message: data.message,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message received. I will get back to you soon.',
        data: { id: savedMessage._id },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[contact]', error)
    return NextResponse.json(
      { success: false, message: 'Unable to send your message right now.' },
      { status: 500 },
    )
  }
}
