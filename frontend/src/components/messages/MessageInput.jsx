import React, { useState, useEffect } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import {GoPaperclip } from "react-icons/go";
import { toast } from "react-toastify";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, messages, setMessages, selectedConversation } =
    useConversation();
  const [file, setFile] = useState(null);

  // Handle sending the message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) {
      console.log('can not send emplty files')
    }

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (message) formData.append("message", message);

      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
      setMessage(""); 
      setFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <div className="flex w-full relative">
        <input
          type="text"
          className="border text-sm  block w-full p-2.5 bg-gray-700 border-gray-700 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label htmlFor="file-input" className="flex items-center px-4 cursor-pointer bg-gray-700 border-gray-700 text-white border-l">
          <GoPaperclip size={20} />
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="flex items-center px-2 bg-blue-500 text-white"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <RiSendPlaneFill size={20} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
