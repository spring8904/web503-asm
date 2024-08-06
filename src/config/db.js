import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/web503-nodejs-asm-mongo')
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}
