import React, { useEffect, useRef, useState } from "react"
import Message from "./Message"
import { useSelector } from "react-redux";
import useConversation from "../../zustand/useConversation"
import { toast } from "react-toastify"
import notificationSound from "../../assets/sounds/notification.mp3"

const Messages = () => {
  const { messages = [], setMessages, selectedConversation } = useConversation()
  const [loading, setLoading] = useState(false)
  const socket = useSelector((state) => state.socket.socket);

  const lastMessageRef = useRef()
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return

      try {
        setLoading(true)
        const res = await fetch(`/api/message/${selectedConversation._id}`)
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setMessages(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getMessages()
  }, [selectedConversation?._id, setMessages])
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound)
      sound.play()
      setMessages((prevMessages) => [...prevMessages, newMessage])
    })

    return () => socket?.off("newMessage")
  }, [setMessages])
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length === 0 && (
        <p className="text-center">Start conversation by sending a message</p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  )
}

export default Messages
