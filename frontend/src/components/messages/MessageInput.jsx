import React, { useState, useEffect } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import useConversation from '../../zustand/useConversation';

const Messageinput = () => {
  const [message, setMessage] = useState('');
  const { loading, setLoading, messages, setMessages, selectedConversation } = useConversation();

  // Handle sending the message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
      setMessage(""); // Clear the input field after sending the message
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can add any effect logic here that you would have placed in useSendMessage
  }, [selectedConversation, messages]); // Example of dependency array

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-b block w-full p-2.5  bg-gray-700 border-gray-700 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-4">
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <RiSendPlaneFill />
          )}
        </button>
      </div>
    </form>
  );
};

export default Messageinput;
