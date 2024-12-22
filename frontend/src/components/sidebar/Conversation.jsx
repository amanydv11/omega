import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSelector } from 'react-redux';

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);

  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-start hover:bg-green-700 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-green-700' : ''
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`${isOnline ? 'online' : ''}`}>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-white font-serif">{conversation.username}</p>
          </div>
        </div>
        </div>
       
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1 "></div>}
    </>
  );
};

export default Conversation;
