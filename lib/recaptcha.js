export async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return { ok: false, message: 'reCAPTCHA is not configured on the server.' }
    }
    return { ok: true }
  }

  if (!token || token === 'dev-bypass') {
    return { ok: false, message: 'Please complete the reCAPTCHA check.' }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const result = await response.json()
  if (!result.success) {
    return { ok: false, message: 'reCAPTCHA verification failed. Please try again.' }
  }

  return { ok: true }
}
