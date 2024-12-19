import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { useSelector } from 'react-redux';
const App = () => {
  const {currentUser} = useSelector((state) =>state.user);
  return (
    <div className='p-4 h-screen items-center justify-center'>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={currentUser ? <Home/> : <Navigate to={"/signup"}/>} />
        <Route path='/login' element={currentUser ? <Navigate to={"/"}/> : <Login/> } />
        <Route path='/signup' element={currentUser ? <Navigate to={"/"} /> : <SignUp/>} />
      </Routes>
     </BrowserRouter> 
    </div>
  )
}

export default App
