import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './Routes/user.route.js'
import AuthRoute from './Routes/auth.route.js'
dotenv.config()
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to db')
    })
    .catch((err) => {
        console.log(err)

    })
const app = express()
app.use(express.json())


app.listen(3000, () => {
    console.log('app running on port 3000')
})
app.use('/api/user', UserRouter)
app.use('/api/user', AuthRoute)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})