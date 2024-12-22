import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import path from 'path'
dotenv.config()
const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("db connect")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
const __dirname = path.resolve();

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/message',messageRoutes)
app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname, 'frontend','dist','index.html'))
})

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server connected ${PORT}`)
});