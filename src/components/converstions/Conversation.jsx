import React, { useContext, useEffect, useState } from 'react'
import './conversation.scss'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const Conversation = ({info, onClick, currentChat}) => {
  const {user} = useContext(AuthContext)
  const userId = info?.members.find((m) => m !== user._id);
  const [friend, setFriend] = useState({});
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios( process.env.REACT_APP_API_URL+'/users?userId=' + userId);
        setFriend(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetcher();
  }, [userId])
  const handleChose = () => { 
    onClick(); 
  }
  return (
    <div className={`conversation ${(currentChat===info._id) && 'chosen'}`} onClick={handleChose}>
      <img className='conversationImg' src='https://images.pexels.com/photos/19656200/pexels-photo-19656200/free-photo-of-an-aerial-view-of-a-lake-and-surrounding-land.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
      <span className='conversationname'> {friend.username || friend.name} </span>
    </div>
  )
}

export default Conversation