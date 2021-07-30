import React, { useEffect, useState } from "react";
import '../css/Chat.css';
import ChatNav from "../components/ChatNav";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import UserList from "../components/UserList"
import FriendsNav from "../components/FriendsNav"


const Chat = (props) => {



    const { user, chat } = props;
    const [hasChatId, setHasChatId] = useState(false);


    useEffect(() => {

        if (Object.keys(chat).length > 1) {
                setHasChatId(true)
        }
        
    }, [chat])

    return (
        <div className="chat-main">

            {hasChatId ?
                <>
                    <ChatNav chat={chat} user={user} />
                    <Messages chat={chat} user={user} />
                    <MessageInput user={user} chat={chat} />

                </>
                :
                <>
                    <FriendsNav user={user} />
                    <UserList chat={chat} user={user} />
                </>
            }


        </div>
    )
}

export default Chat;