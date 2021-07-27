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
                <div className = "searchCont tooltip-search">
                    <input className = "chatNavSearch " type="text"  placeholder = "Search"/>
                    <button className= "glass bi bi-search"></button>
                    <div className="tooltiptext-search">
                        <div className="tooliptext-searchDiv">
                            <h4>Search Options</h4> 
                            <i class="bi bi-question-circle tooltip-so">
                                <div className="tooltiptext-so fade-in">
                                    <p>Learn more</p>
                                </div>
                            </i>
                        </div>
                        <li>
                            <ul><span className="tooltipLabel">from:</span> user</ul>
                            <ul><span className="tooltipLabel">mentions:</span> user</ul>
                            <ul><span className="tooltipLabel">before:</span> specific date</ul>
                            <ul><span className="tooltipLabel">during:</span> specific date</ul>
                            <ul><span className="tooltipLabel">after:</span> specific date</ul>
                            <ul><span className="tooltipLabel">from:</span> user</ul>
                            <ul><span className="tooltipLabel">in:</span> channel</ul>
                        </li>
                    </div>
                </div>
                <button className = "chatNavButtons bi bi-inbox tooltip">
                    <div className = "tooltiptext-sm">
                        <p>Inbox</p>
                    </div>
                </button>
                <button className = "chatNavButtons bi bi-patch-question tooltip">
                    <div className = "tooltiptext-sm">
                        <p>Help</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default ChatNav;
