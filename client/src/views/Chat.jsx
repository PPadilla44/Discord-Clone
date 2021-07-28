import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import '../css/Chat.css';
import ChatNav from "../components/ChatNav";
import MessageInput from "../components/MessageInput";


const Chat = (props) => {

    const [socket] = useState(() => io(':8000'));

    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const chatId = props.chatId;

    const { user } = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/messages/${chatId}`)
            .then(res => {

                setMessages(res.data.reverse());
                setLoaded(true);
            });

        
        socket.on('new_message_from_server', data => {

            setMessages(prevMsgs => {
                return [data, ...prevMsgs]
            })
        })

        return () => socket.disconnect(true)

    }, [])


    return (
        <div className="chat-main">
            <ChatNav />

            <div className="chatBox">
                <ul className="chatMessages">
                    
                    {loaded && messages.map((m, i) => {
                        return <div key={i} className="messageContainer">
                            <div className="chatContents">
                                <img src="https://cdn.discordapp.com/avatars/537805209460539428/91a36ff715aea2eb46c7e10dd4e832ac.png?size=128" alt="avatar" className="avatar" />
                                <h2 className="ChatMessageHeader">
                                    <span className="ChatMessageHeaderUserName">{m.senderUserName}</span>
                                    <span className="ChatMessageHeaderTimestamp">{new Date(m.createdAt).toLocaleDateString()}</span>
                                </h2>
                                <div className="ChatMessageContent">{m.contents}</div>
                            </div>
                        </div>
                    })}
                    <div className="chatSeperator" >
                        <span className="chatDate">July 23, 2021</span>
                    </div>
                </ul>

            </div>
            <MessageInput user={user} chatId={chatId} />

        </div>
    )
}

export default Chat;