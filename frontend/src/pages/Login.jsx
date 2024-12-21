import React,{ useState } from 'react'
import { Alert } from "flowbite-react";
import {useNavigate } from "react-router-dom";
import { logInFailure,logInStart,logInSuccess, } from '../redux/userSlice';
import {useDispatch,useSelector } from "react-redux";
import OAuth from '../components/Oauth';
const Login = () => {
    const[formData,setFormData] = useState({})
    const {loading,error:errorMessage} =useSelector(state=> state.user);
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value.trim() })
    }
const handleSubmit = async(e)=>{

    e.preventDefault();
    if(!formData.email || !formData.password){
        return dispatch(logInFailure('Please fill all the fields'))
       }
       try {
        dispatch(logInStart());
        const res= await fetch('/api/auth/login',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData) 
        });
        const data = await res.json();
        if(data.success===false){
            dispatch(logInFailure(data.message))
        }
        if(res.ok){
          dispatch(logInSuccess(data))
            navigate('/')
        }
    } catch (error) {
        dispatch(logInFailure(error.message))
    }
}

  return (
    <div className=' flex justify-center items-center min-h-screen'>
       <div className="bg-white shadow-md rounded-lg mt-5 p-8 max-w-md w-full">
       <h1 className='text-3xl font-serif font-semibold text-center text-slate-700'>Login</h1>
                    <div className="flex justify-center mb-6">
                        <button onClick={()=>{navigate('/signup')}} className="text-gray-700 font-semibold  pb-2 px-4">Sign up</button>
                        <button className="text-gray-700 font-semibold border-b-2 border-green-500 pb-2 px-4">Log in</button>
                    </div>
                    <div className="flex flex-col space-y-4">
                       <OAuth/>
                    </div>
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-4 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">* Email</label>
                            <input type="email" placeholder="example@gmail.com" id="email" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">* Password</label>
                            <input type="password" id="password" onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg" disabled={loading}>Signin</button>
                    </form>
                    {
            errorMessage && (
                <Alert className="mt-5"color="red" >{errorMessage}</Alert>
            )
          }
                </div>
    </div>
  )
}

export default Login;
