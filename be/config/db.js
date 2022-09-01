import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`database mongodb connected : ${conn.connection.host}`.bgWhite)
  } catch (error) {
    console.log(`error : ${error.message}`.bgRed)
    process.exit(1)
  }
}

export default connectDB
