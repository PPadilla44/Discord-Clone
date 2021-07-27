import React from "react";
import Icons from "./Icons"
import DMs from "./DMs";
import Chat from "./Chat"

const Main = (props) => {

    console.log(props.groupId);
    console.log(props.chatId);

    return (
        <>
            <Icons/>
            <DMs groupId={props.groupId}/>
            <Chat chatId={props.chatId}/>
        </>
    )
}

export default Main
