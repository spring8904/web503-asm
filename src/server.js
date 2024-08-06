import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db'
import bookAPIRouter from './routers/api/book'
import categoryAPIRouter from './routers/api/category'
import authAPIRouter from './routers/api/auth'
import authEJSRouter from './routers/ejs/auth'
import bookEJSRouter from './routers/ejs/book'
import reviewEJSRouter from './routers/ejs/review'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('dev'))

// Set up static files
app.use(express.static('src/assets'))
app.use(express.static('src/uploads'))

// Connect to MongoDB
connectDB()

// Set up view engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

// EJS Routes
app.use('/', bookEJSRouter)
app.use('/', authEJSRouter)
app.use('/', reviewEJSRouter)

// API Routes
app.use('/api', bookAPIRouter)
app.use('/api', categoryAPIRouter)
app.use('/api', authAPIRouter)

export const viteNodeApp = app
