import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import errorHandler from '../error.js'

export const signup=async(req,res,next)=>{
const {username,email,password}= req.body;
if(!username || !email || !password){
    next(errorHandler(400,'All fields are required'));
}
const hashedPassword =await bcrypt.hash(password,10);
const newUser = new User({
    username,
    email,
    password:hashedPassword,
})
try {
    await newUser.save();
    res.json({message:'User Created'})
} catch (error) {
    next(error)
}}

export const login = async(req,res,next)=>{
const {email,password}=req.body;
if(!email || !password){
    next(errorHandler(400,'All fields are required'));
}
try {
    const realUser =await User.findOne({email});
    if(!realUser){
        next(errorHandler(400,'Something went wrong'));
    }
    const validPassword = bcrypt.compareSync(password,realUser.password);
    if(!validPassword){
        next(errorHandler(404,'something went wrong'))
    }
    const token = jwt.sign(
        {id:realUser._id,isAdmin:realUser.isAdmin},process.env.JWT_SECRET
    )
    res.status(200).cookie('access_token',token,{
        httpOnly:true,
    }).json(realUser)
} catch (error) {
    next(error)
}
}
export const signout = async(req,res,next)=>{
 try {
    res.clearCookie('access_token').status(200).json('User has been signed out')
 } catch (error) {
    next(error)
 }   
}

export  const google =async (req,res,next)=>{
    const{email,name}= req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET);
            const{password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }else{
            const generatedPassword = 
            Math.random().toString(36).slice(-8)+
            Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
            const{password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }
    } catch (error) {
        next(error)
    }
 }

