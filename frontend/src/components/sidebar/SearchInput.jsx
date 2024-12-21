import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import useConversation from '../../zustand/useConversation';
import { toast } from 'react-toastify';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const { setSelectedConversation } = useConversation();
  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/user/getusers');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    const conversations = conversation.find((conversations) =>
      conversations.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversations) {
      setSelectedConversation(conversations);
      setSearch('');
    } else {
      toast.error('No user found with this username');
    }
  };

  return (
    <form className="flex  items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded bg-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={loading}
      />
      <button type="submit" className="btn btn-circle" disabled={loading}>
        <BiSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
