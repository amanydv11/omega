import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'
import {
  Table,
  TableHeadCell,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Modal,
  ModalBody,
  Button,
  ModalHeader,
} from "flowbite-react";
const AllUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const [showMore,setShowMore] = useState(true)
const [showModal,setShowModal]= useState(false);
const[userIdToDelete,setUserIdToDelete] = useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async()=>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev,...data.users]);
        if(data.users.length<9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
            method:'DELETE'
          });
        const data = await res.json();
        if (res.ok) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div className="table-auto  min-h-screen md:mx-auto pt-4 m-2">
      {currentUser && users.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md bg-white rounded ">
            <TableHead>
              <TableHeadCell>Date created</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {users.map((user) => (
              <TableBody key={user._id}>
                <TableRow className=" text-black ">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                   {user.username}
                  </TableCell>
                 <TableCell>{user.email}</TableCell>
                 <TableCell>{user.isAdmin ? (<FaCheck className='text-green-500' />):(<FaTimes className='text-red-500'/>)}</TableCell>

                  <TableCell>
                    <span onClick={()=>{
      setShowModal(true);
      setUserIdToDelete(user._id);
                    }} className="font-medium text-red-500 hover:underline cursor-pointer" >Delete</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7 ">Show more</button>
            )
          }
        </>
      ) : (
        <p>You have no users yet</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
<ModalHeader/>
<ModalBody>
  <div className="m-5 text-center">
    <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto"/>
    <h3 className="mb-5 text-lg text-gray-800">Are you sure you want to delete this user ?</h3>
    <div className="flex justify-center gap-4">
      <Button className="bg-red-500  " color="black" onClick={handleDeleteUser}>Yes, I'm sure</Button>
   <Button color="gray" onClick={()=>setShowModal(false)}>No</Button>
    </div>
  </div>
</ModalBody>
      </Modal>
   
   <Button className="mt-2" onClick={()=>{navigate('/')}} color="gray">Go Back to home</Button>
    </div>
  );
};

export default AllUsers;

