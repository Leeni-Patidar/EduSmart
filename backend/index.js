import express from 'express'
import { connectDB } from './src/config/db.js'
import { ENV } from './src/config/env.js'
import cookieParser from 'cookie-parser'
import userRoute from './src/routes/user.route.js'
import courseRoute from './src/routes/course.route.js'
import moduleRoute from './src/routes/module.routes.js'
import quizRoute from './src/routes/quiz.route.js'
import paymentRoute from './src/routes/payment.route.js'
import analyticRoute from './src/routes/analytic.route.js'
import cors from 'cors'
import { User } from './src/models/user.model.js'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors({
    origin:true,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/user', userRoute)
app.use('/api/course', courseRoute)
app.use('/api/module', moduleRoute)
app.use('/api/quiz', quizRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/analytic', analyticRoute)




app.listen(ENV.PORT,async ()=>{
    console.log("server started", ENV.PORT)
    await connectDB()
    // Create admin user if not exists
    const adminUser = await User.findOne({email: ENV.ADMIN})
    if(!adminUser){
        const hashedPassword = await bcrypt.hash(ENV.Admin_Password, 10)
        await User.create({
            fullName: 'Admin',
            email: ENV.ADMIN,
            password: hashedPassword,
            admin: true
        })
        console.log('Admin user created')
    }
})
