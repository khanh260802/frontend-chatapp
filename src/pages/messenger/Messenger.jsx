import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from './../../components/topbar/Topbar';
import './messgenger.scss'
import Conversation from './../../components/converstions/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatonline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios  from 'axios';
import {io} from 'socket.io-client'
const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null); // [currentChat, setCurrentChat
    const [messages, setMessages] = useState([]);
    const {user} = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState(''); 
    const [usersOnline, setUsersOnline] = useState([]); 
    const socket = useRef(); 
    const fetchMessages = async () => {
        // if (!currentChat) return;
        try {
            console.log('fetching...');
            const res = await axios(process.env.REACT_APP_API_URL+'/messages/' + currentChat._id);
            setMessages(res.data);
            console.log('done...');
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=> {
        socket.current = io('ws://localhost:8900'); 
    }, []) 
    useEffect(() => { 
        socket.current.on("receiveMessage", (current_chat) => { 
            setCurrentChat(current_chat); 
        }); 
    }, [])
    useEffect(() => { 
        const fetcher = async () => { 
            try {
                const res =  await axios(process.env.REACT_APP_API_URL+'/conversations/' + user?._id); 
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetcher(); 
    }, [user?._id])
    useEffect(() => { 
        if(!currentChat) 
            return; 
        fetchMessages(); 
        socket.current.emit('joinRoom', currentChat); 
    }, [currentChat]);

    useEffect(() => { 
        console.log(user)
    }, [user])

    useEffect(()=> {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setUsersOnline(users)
        })
    },[user._id])
    const handleSendToSocketServer = () => {
        // socket.current.emit("sendMessage", currentChat);
        socket.current.emit('sendMessage', currentChat); 
    }
    const handleSend = async () => {
        setNewMessage(''); 
        const message = { 
            conversationId:currentChat?._id,
            senderId:user._id,
            text:newMessage
        }
        try {
            const res= await axios.post(process.env.REACT_APP_API_URL+'/messages', message); 
            setMessages([...messages, res.data]); 
            handleSendToSocketServer(); 
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                    {conversations.map((item) => ( 
                        <Conversation info = {item} key={item._id} onClick={() => setCurrentChat(item)} currentChat={currentChat?._id}/>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentChat ? 
                        <>
                            <div className="chatBoxTop">
                                {
                                    messages.map((item) => (
                                        <Message info={item} key={item._id}/>
                                    ))
                                }
                            </div>
                            <div className="chatBoxBottom">
                                <textarea onKeyDown={(e)=>{(e.key==='Enter' && handleSend())}} value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className='chatMessageInput' placeholder='write something...'></textarea>
                                <button onClick={handleSend} className='chatSubmitButton'>Send</button>

                            </div>
                        </> : 
                        <span className='noConversationText'> Choose a Conversation.</span>
                    }
                </div>
            </div>
            <div className="chatOnlineGr">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messenger