import React, { useContext, useEffect, useRef } from 'react'
import './message.scss'
import { AuthContext } from '../../context/AuthContext';
import formatTimeAgo from '../../utils/formatTimeAgo';
const Message = ({info}) => {
  const {user} = useContext(AuthContext);
  const ref = useRef(); 
  useEffect(() => { 
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [])
  return (
    <div ref={ref} className={`message ${(user._id === info.senderId) && 'owner'}`}>
        <div className=""> {info?.senderId} </div>
        <div className="messageTop">
            <img src="https://images.pexels.com/photos/19656200/pexels-photo-19656200/free-photo-of-an-aerial-view-of-a-lake-and-surrounding-land.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='messageImg'/>
            <p className='messageText'>{info?.text}</p>
        </div>
        <div className="messageBottom">
          {formatTimeAgo(info?.createdAt)}
        </div>
    </div>
  )
}

export default Message