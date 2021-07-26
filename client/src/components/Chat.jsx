import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import "../css/Chat.css"
import ChatNav from "./ChatNav";


const Chat = (props) => {

    const [socket] = useState(() => io(':8000'));

    useEffect(() => {

        socket.emit('join', "HEllooo")


    }, [])


    return (
        <div className="chat-main">
            <ChatNav/>
            CHAt
        </div>
    )
}

export default Chat;

// aight monkey brain sam you just type rafce and then press enter


