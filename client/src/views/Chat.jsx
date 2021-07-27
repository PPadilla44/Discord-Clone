import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import '../css/Chat.css';
import ChatNav from "../components/ChatNav";
import MessageInput from "../components/MessageInput";


const Chat = (props) => {

    const [socket] = useState(() => io(':8000'));

    useEffect(() => {

        socket.emit('join', "HEllooo")


    }, [])


    return (
        <div className="chat-main">
            <ChatNav/>
            <div className="messageContainer">
                <div className="chatContents">
                    <img src="https://cdn.discordapp.com/avatars/537805209460539428/91a36ff715aea2eb46c7e10dd4e832ac.png?size=128" className="avatar" />
                    <h2 className="ChatMessageHeader">
                        <span className="ChatMessageHeaderUserName">Famish</span>
                        <span className="ChatMessageHeaderTimestamp">07/23/2021</span>
                    </h2>
                    <div className="ChatMessageContent">its like questions n asnwers</div>
                </div>
            </div>
            <div className="chatSeperator" >
                <span className="chatDate">July 23, 2021</span>
            </div>
            <div className="messageContainer">
                <div className="chatContents">
                    <img src="https://cdn.discordapp.com/avatars/537805209460539428/91a36ff715aea2eb46c7e10dd4e832ac.png?size=128" className="avatar" />
                    <h2 className="ChatMessageHeader">
                        <span className="ChatMessageHeaderUserName">Famish</span>
                        <span className="ChatMessageHeaderTimestamp">07/23/2021</span>
                    </h2>
                    <div className="ChatMessageContent">Im a tiny kitty meow meow</div>
                </div>
            </div>
            <div className="chatSeperator" >
                <span className="chatDate">July 23, 2021</span>
            </div>            
            <MessageInput/>
        </div>
    )
}

export default Chat;