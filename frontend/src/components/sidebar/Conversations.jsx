import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Conversation from './Conversation';

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setConversation(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  const conversationsArray = Array.isArray(conversation) ? conversation : [];

  return (
    <div className=" py-2 px-4 flex flex-col overflow-auto">
      {conversationsArray.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversationsArray.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
