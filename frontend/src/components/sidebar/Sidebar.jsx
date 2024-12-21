import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
const Sidebar = () => {
  return (
    <div className='border border-gray-600 rounded-l-lg p-4 flex flex-col'>
        <SearchInput/>
        <div className="divider">
        <Conversations/>
        </div>
        
    </div>
  )
}
export default Sidebar
