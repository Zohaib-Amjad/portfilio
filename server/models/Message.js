const mongoose = require('mongoose');

/**
 * Stores contact requests submitted from the portfolio.
 * Validation is duplicated at the database boundary as a final safeguard.
 */
const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Message', messageSchema);
