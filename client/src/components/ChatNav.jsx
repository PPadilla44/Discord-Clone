import React, { useState, useEffect } from "react";
import "../css/Chat.css";

const ChatNav = (props) => {

    const {chat, user} = props;
    const { users } = chat;
    const [searchInput, setSearchInput] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(Object.keys(chat).length > 1 && chat !== undefined) {
            setLoaded(true)
        }

    },[chat])


    const prepopulateSearch = (text) => {
        console.log(text);
    }

    return (
        <div className="chatNav">
            <h3 style={{ fontWeight: "normal" }}>
                <span style={{ color: "gray", fontSize: "1.3rem", fontWeight: "bold" }}>
                    @{" "}
                </span>{" "}
                {/* nevermind we're mapping this now */}    
                { loaded && users.filter( name => name.userName !== user.userName ).map(name => name.userName) }
            </h3>
            <div className="flexRow">
                <button className="chatNavButtons bi bi-telephone tooltip">
                    <div className="tooltiptext">
                        <p>Start a Voice Call</p>
                    </div>
                </button>
                <button className="chatNavButtons bi bi-camera-video tooltip">
                    <div className="tooltiptext">
                        <p>Start a Video Call</p>
                    </div>
                </button>
                <button className="chatNavButtons bi bi-pin-angle tooltip">
                    <div className="tooltiptext">
                        <p>Pinned Messages</p>
                    </div>
                </button>
                <button className="chatNavButtons bi bi-person-plus tooltip">
                    <div className="tooltiptext">
                        <p>Add Friends to DM</p>
                    </div>
                </button>
                <form className="searchCont tooltip-search">
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="chatNavSearch "
                        type="text"
                        placeholder="Search"
                    />
                    <button className="glass bi bi-search"></button>
                    <div className="tooltiptext-search">
                        <div className="tooliptext-searchDiv">
                            <h4>Search Options</h4>
                            <i className="bi bi-question-circle tooltip-so">
                                <div className="tooltiptext-so fade-in">
                                    <p>Learn more</p>
                                </div>
                            </i>
                        </div>
                        <li>
                            <ul value={123} onClick={(e) => prepopulateSearch("from:")}>
                                <span className="tooltipLabel">from:</span> user
                            </ul>
                            <ul value={123} onClick={(e) => prepopulateSearch("mentions:")}>
                                <span value="242" className="tooltipLabel">
                                    mentions:
                                </span>{" "}
                                user
                            </ul>
                            <ul value={123} onClick={(e) => prepopulateSearch("before:")}>
                                <span className="tooltipLabel">before:</span> specific date
                            </ul>
                            <ul value={123} onClick={(e) => prepopulateSearch("during:")}>
                                <span className="tooltipLabel">during:</span> specific date
                            </ul>
                            <ul value={123} onClick={(e) => prepopulateSearch("after:")}>
                                <span className="tooltipLabel">after:</span> specific date
                            </ul>
                            <ul value={123} onClick={(e) => prepopulateSearch("in:")}>
                                <span className="tooltipLabel">in:</span> channel
                            </ul>
                        </li>
                    </div>
                </form>
                <button className="chatNavButtons bi bi-inbox tooltip">
                    <div className="tooltiptext-sm">
                        <p>Inbox</p>
                    </div>
                </button>
                <button className="chatNavButtons bi bi-patch-question tooltip">
                    <div className="tooltiptext-sm">
                        <p>Help</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ChatNav;
