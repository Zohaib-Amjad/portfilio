const { validationResult } = require('express-validator');
const Message = require('../models/Message');

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
