import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'
import morgan from 'morgan'
import colors from 'colors'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import {
  errorHandler,
  notFoundHandler,
} from './app/middleware/errorMiddleware.js'

const app = express()

connectDB()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/v1/product', productRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(8000, () =>
  console.log(`server running on ${process.env.HOSTNAME}`.bgGreen)
)
