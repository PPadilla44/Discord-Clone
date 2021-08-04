import React, { useState, useEffect } from "react";
import "../css/Chat.css";
import axios from 'axios';
import io from 'socket.io-client';


const FriendsNav = (props) => {

    const { user, displayList, setDisplayList } = props;

    const [socket] = useState(() => io(':8000'));

    const [loaded, setLoaded] = useState(false);
    const [friendName, setFriendName] = useState("")
    const [inputName, setInputName] = useState("")

    const { friends: userFriends } = user;

    const [success, setSuccesss] = useState(-2);


    const showAddNewChat = () => {
        setDisplayList("none")
        setLoaded(true)
    }




    const onSubmitHandler = (e) => {
        e.preventDefault()


        if (inputName.length < 1) {
            setSuccesss(-1)
            return;
        }


        axios.get('http://localhost:8000/api/users/' + inputName)
            .then(res => {
                if (!res.data) {
                    setSuccesss(0)
                    return;
                }
                if(user.friends.filter(friend => friend.userName === inputName).length > 0) {
                    setSuccesss(-3);
                    return;
                } 
                let { firstName, lastName, _id, userName, hexColor, onlineStatus, friends: otherFriends } = res.data;
                let data = {
                    _id,
                    firstName,
                    lastName,
                    userName,
                    hexColor,
                    onlineStatus,
                    // [pendingStatus, incoming]
                    pending: [true, false],
                }
                let friend = data;
                let friends = userFriends;
                friends.push(friend)
                if (res.data) {
                    axios.put('http://localhost:8000/api/users/' + user._id, {
                        friends
                    })
                        .then(res => {


                            let userData = {
                                _id: user._id,
                                firstName: user.friendName,
                                lastName: user.lastName,
                                userName: user.userName,
                                hexColor: user.hexColor,
                                onlineStatus: user.onlineStatus,
                                // [pendingStatus, incoming]
                                pending: [true, true],
                            }
                            let friend = userData;
                            let friends = otherFriends;
                            friends.push(friend)
                            axios.put('http://localhost:8000/api/users/' + data._id, {
                                friends
                            })
                                .then(res => {
                                    setSuccesss(1)
                                    setFriendName(inputName);
                                    setInputName("");
                                    socket.emit('send_friend_request')
                                })
                                .catch(err => console.log(err))
                            
                        })
                        .catch(err => console.log(err))


                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {



    }, [loaded])

    const handleDisplayList = (list) => {
        setDisplayList(list);
        setLoaded(false)
    }


    return (
        <>
            <div className="chatNav">
                <div className="flexRow">
                    <div className="flexRow friendsNavIcon">
                        <svg style={{ color: "gray", marginRight: "7px" }} x="0" y="0" className="icon-22AiRD" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd">
                                <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path>
                                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                            </g>
                        </svg>
                        <h4>Friends</h4>
                    </div>
                    <div className="flexRow friendsNavStart">
                        <h4 onClick={() => handleDisplayList("Online")} style={displayList === 'online' ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }} className="chatNavButtons-friends">Online</h4>
                        <h4 onClick={() => handleDisplayList("All")} style={displayList === 'all' ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }} className="chatNavButtons-friends">All</h4>
                        <h4 onClick={() => handleDisplayList("Pending")} style={displayList === 'pending' ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }} className="chatNavButtons-friends">Pending</h4>
                        <h4 onClick={() => handleDisplayList("Blocked")} style={displayList === 'blocked' ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }} className="chatNavButtons-friends">Blocked</h4>
                        <h4 className="chatNavButtons-friends" id="addFriendBtn" onClick={showAddNewChat}>Add Friend</h4>
                    </div>
                </div>
                <div className="flexRow">
                    <button className="chatNavButtons bi bi-chat-left-text tooltip" onClick={showAddNewChat}>
                        {/* Got rid of these because this was the reason why the tooltip wasn't worked. Replaced the icon with something similiar */}
                        {/* <svg style={{marginRight: "5px", paddingRight: "10px", color: "lightgray"}} x="0" y="0" className="tooltip" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"> */}
                        <div className="tooltiptext">
                            <p>New Group DM</p>
                        </div>
                        {/* <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z"></path>
                    </svg> */}
                    </button>
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
            {loaded &&
                <div className="addNewFriend">
                    <h3>ADD FRIEND</h3>
                    {success === -3 && <p style={{ color: "hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)" }}>You've already have <strong>{friendName}</strong> as a friend</p>}
                    {success === -2 && <p>You can add a friend with their Discord Tag. It's cAsE sEnSiTiVe</p>}
                    {success === -1 && <p style={{ color: "hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)" }}>Don't just submit nothing bro</p>}
                    {success === 0 && <p style={{ color: "hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%)" }}>Hm, didnt work. Double check the capitalization, spelling, any spaces, and numbers are correct.</p>}
                    {success === 1 && <p style={{ color: "green" }}>Success! Your friend request to <strong>{friendName}</strong> was sent</p>}

                    <form onSubmit={onSubmitHandler}>
                        <p>
                            <input autoComplete={"off"} type="text" name="sendFriendRequest" placeholder="Enter a Username#0000" onChange={(e) => setInputName(e.target.value)} value={inputName} />
                            <input type="submit" value="Send Friend Request" />
                        </p>

                    </form>
                </div>
            }
        </>
    );
};

export default FriendsNav;
