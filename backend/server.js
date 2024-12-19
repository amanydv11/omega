import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connect")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());


app.use('/api/auth',authRoutes)


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server connected ${PORT}`)
});