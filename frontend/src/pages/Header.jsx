import React from 'react'
import { Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router";
import { Link} from "react-router-dom";
import { signoutSuccess } from '../redux/userSlice'
import { useSelector,useDispatch } from 'react-redux';
const Header = () => {
    const handleSignout =async ()=>{
        try {
          const res= await fetch('/api/auth/signout',{
            method:'POST',
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message)
          }
          else{
    dispatch(signoutSuccess());
          }
        } catch (error) {
          
        }
        
      }
   const {currentUser} = useSelector((state) =>state.user);
   const navigate = useNavigate()
   const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center">
                            <span className="text-3xl font-serif font-semibold ml-2 text-center text-white">Omega</span>
    {currentUser? (
     <Dropdown
     arrowIcon={false}
     inline
     label={
       <Avatar className='mt-2 w-12 h-10' alt='user' img='https://tse3.mm.bing.net/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&pid=Api&P=0&h=180' rounded />
     }
   >
<Dropdown.Header>
              <span className='block text-sm '>{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser && (
          <Link to="/users">
            <Dropdown.Item>
              Users
            </Dropdown.Item>
          </Link>
        )}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
    </Dropdown>
):
(
    <button onClick={()=>navigate('/signup')}></button>
)
}
                    </header>
  )
}

export default Header
