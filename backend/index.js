const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')

const connectDB = require('./config/connectDB')

// import routes
const userRouter = require('./routes/userRouter')
const postRoutes = require('./routes/postRouter')
const passportRoutes = require('./routes/passportRouter')

// set express
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser('a;sldkfj;laksjdfasdjl;kfjd'))

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'http://localhost'
app.listen(PORT, () => console.log(`Start port on: ${HOST}:${PORT}`))

// connect to database
connectDB()

// set up routes
// register and auth user
app.use('/users', userRouter)
app.use('/posts', postRoutes)
app.use('/passport', passportRoutes)
