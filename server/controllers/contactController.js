const { validationResult } = require('express-validator');
const Message = require('../models/Message');

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Local/dev without keys can still submit; production must verify.
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return { ok: false, message: 'reCAPTCHA is not configured on the server.' };
    }
    return { ok: true };
  }

  if (!token || token === 'dev-bypass') {
    return { ok: false, message: 'Please complete the reCAPTCHA check.' };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const result = await response.json();
  if (!result.success) {
    return { ok: false, message: 'reCAPTCHA verification failed. Please try again.' };
  }

  return { ok: true };
}

/**
 * Validates and persists a portfolio contact request.
 */
const createMessage = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Please check the highlighted fields.',
      errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }

  try {
    const captcha = await verifyRecaptcha(req.body.recaptchaToken);
    if (!captcha.ok) {
      return res.status(422).json({
        success: false,
        message: captcha.message,
        errors: [{ field: 'recaptcha', message: captcha.message }],
      });
    }

    const savedMessage = await Message.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    return res.status(201).json({
      success: true,
      message: 'Message received. I will get back to you soon.',
      data: { id: savedMessage._id },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage };
