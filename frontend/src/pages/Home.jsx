import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/messages/MessageContainer'
const Home = () => {
  return (
    
<div className='flex md:h-[450px] rounded-lg overflow-hidden bg-clip-padding backdrop-filte backdrop-blur-lg bg-opacity-0'>
     <Sidebar/>
     <MessageContainer/>
    </div>
  )
}

export default Home
