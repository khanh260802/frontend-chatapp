import React from 'react'
import './ChatOnline.scss'
const ChatOnline = () => {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src="https://images.pexels.com/photos/19656200/pexels-photo-19656200/free-photo-of-an-aerial-view-of-a-lake-and-surrounding-land.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <div className="chatOnlineBadege"></div>
            </div>
            <span className="chatOnlineName">Khanh</span>
        </div>
    </div>
  )
}

export default ChatOnline