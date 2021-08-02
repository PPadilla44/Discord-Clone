import React, { useState } from "react";
import '../css/Chat.css';
import ChatNav from "../components/ChatNav";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import UserList from "../components/UserList"
import FriendsNav from "../components/FriendsNav"


const Chat = (props) => {



    const { user, setChat, chat, setNewDM } = props;
    const [displayList, setDisplayList] = useState("all")


    return (
        <div className="chat-main">

            {Object.keys(chat).length > 1 ?
                <>
                    <ChatNav chat={chat} user={user} />
                    <Messages chat={chat} user={user} />
                    <MessageInput user={user} chat={chat} />

                </>
                :
                <>
                    <FriendsNav displayList={displayList} setDisplayList={setDisplayList} user={user} />
                    <UserList setNewDM={setNewDM} setChat={setChat} displayList={displayList} user={user} />
                </>
            }


        </div>
    )
}

export default Chat;