const mongoose = require('mongoose');

/**
 * Opens the application's MongoDB connection.
 * The process exits on startup failure so the API never accepts traffic
 * while persistence is unavailable.
 */
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured');
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
