import React, { useState, useEffect } from "react";
import "../css/Chat.css";

const FriendsNav = (props) => {

    const { user } = props;
    const [searchInput, setSearchInput] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {



    }, [])



    return (
        <div className="chatNav">
            <div className="flexRow">
                <div className="flexRow friendsNavIcon">
                    <svg style={ { color: "gray", marginRight: "7px" } } x="0" y="0" className="icon-22AiRD" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fillRule="evenodd">
                            <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path>
                            <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                        </g>
                    </svg>
                    <h4>Friends</h4>
                </div>
                <div className="flexRow friendsNavStart">
                    <h4 className="chatNavButtons-friends">Online</h4>
                    <h4 className="chatNavButtons-friends">All</h4>
                    <h4 className="chatNavButtons-friends">Pending</h4>
                    <h4 className="chatNavButtons-friends">Blocked</h4>
                    <h4 className="chatNavButtons-friends" id="addFriendBtn">Add Friend</h4>
                </div>
            </div>
            <div className="flexRow">
                <svg style={{marginRight: "5px", paddingRight: "10px", color: "lightgray"}} x="0" y="0" className="tooltip" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                    <div className="tooltiptext-sm">
                        <p>New Group DM</p>
                    </div>
                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z"></path>
                </svg>
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

export default FriendsNav;
