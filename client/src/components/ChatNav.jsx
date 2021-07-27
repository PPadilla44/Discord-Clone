import React, { useEffect, useState } from "react";
import "../css/Chat.css"


const ChatNav = (props) => {


    return (
        <div className = "chatNav">
            <h2>@ userName | aka optionalName</h2>
            <div className="flexRow">
                <button className = "chatNavButtons bi bi-telephone tooltip">
                    <div className="tooltiptext">
                        <p>Start a Voice Call</p>
                    </div>
                </button>
                <button className = "chatNavButtons bi bi-camera-video tooltip">
                    <div className="tooltiptext">
                        <p>Start a Video Call</p>
                    </div>
                </button>
                <button className = "chatNavButtons bi bi-pin-angle tooltip">
                    <div className = "tooltiptext">
                        <p>Pinned Messages</p>
                    </div>
                </button>
                <button className = "chatNavButtons bi bi-person-plus tooltip">
                    <div className = "tooltiptext">
                        <p>Add Friends to DM</p>
                    </div>
                </button>
                <div className = "searchCont tooltip">
                    <input className = "chatNavSearch" type="text"  placeholder = "Search"/>
                    <button className= "glass bi bi-search"></button>
                    <div>
                        <p></p>
                        <li>
                            <ul></ul>
                            <ul></ul>
                            <ul></ul>
                            <ul></ul>
                            <ul></ul>
                            <ul></ul>
                            <ul></ul>
                        </li>
                    </div>
                </div>
                <button className = "chatNavButtons bi bi-inbox tooltip">
                    <div className = "tooltiptext-sm">
                        <p>
                            Inbox
                        </p>
                    </div>
                </button>
                <button className = "chatNavButtons bi bi-patch-question tooltip">
                    <div className = "tooltiptext-sm">
                        <p>
                            Help
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ChatNav;
