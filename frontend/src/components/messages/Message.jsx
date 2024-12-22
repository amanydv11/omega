import React from 'react'
import { formatTime } from '../../utils/formatTime';
import { useSelector} from 'react-redux';
const Message = ({message}) => {
const {currentUser} = useSelector((state) =>state.user);
const messageFromMe = message.senderId === currentUser._id
const chatClassName = messageFromMe ? "chat-end" : "chat-start"
	const msgBgColor = messageFromMe ? "bg-green-500" : "";
  
	const formattedTime = formatTime(message.createdAt)
	const shakeClass = message.shouldShake ? "shake" : "";
  return (
  <>
    <div className={`chat ${chatClassName} `} >
			<div className={`chat-bubble rounded overflow-hidden  pb-2 ${msgBgColor} ${shakeClass}`}>{message.message}</div>

			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime} </div>
		</div>
	  </>
  )
}

export default Message
