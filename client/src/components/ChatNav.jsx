import React, { useEffect, useState } from "react";
import "../css/Chat.css"

const ChatNav = (props) => {

    return (
        <div className = "chatNav">
            <h2>@ userName| aka optionalName</h2>
            <div className="flexRow">
                <button className = "chatNavButtons">Voice</button>
                <button className = "chatNavButtons">Video</button>
                <button className = "chatNavButtons">Pinned</button>
                <button className = "chatNavButtons">Add friends</button>
                <div className="search">
                    <div className="searchBar">

                    </div>
                    <input className = "chatNavSearch" type="text"  value = "search"/>
                </div>
                <button className = "chatNavButtons">inbox</button>
                <button className = "chatNavButtons">Help</button>
            </div>
        </div>
    )
}

export default ChatNav;