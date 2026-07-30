const express = require('express');
const { body } = require('express-validator');
const { createMessage } = require('../controllers/contactController');

const router = express.Router();

const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 80 })
    .withMessage('Name must be 80 characters or fewer.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Enter a valid email address.')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email must be 254 characters or fewer.'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2,000 characters.'),
];

router.post('/', contactValidation, createMessage);

module.exports = router;
