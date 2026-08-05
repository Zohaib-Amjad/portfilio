import mongoose from 'mongoose'

const globalForMongoose = globalThis

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = { conn: null, promise: null }
}

const cached = globalForMongoose.mongooseCache

export default async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured')
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
