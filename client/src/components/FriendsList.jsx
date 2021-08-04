import axios from 'axios';
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';

import '../css/FriendsList.css';



const FriendsList =  (props) =>{

    const { user, joinChat, displayList } = props;

    const [socket] = useState(() => io(':8000'));

    const [ userFriends, setUserfriends] = useState(user.friends)
    const [displayUsers, setDisplayUsers ] = useState(userFriends.filter(friend => friend.pending === undefined));
    const [displayText, setDisplayText ] = useState("ALL FRIENDS")

    const [displayMore, setDisplayMore] = useState(false)

    const [trigger, setTrigger] = useState([])

    useEffect(() => {

        socket.on('receive_friend_request', () => {
            axios.get(`http://localhost:8000/api/users/one/${user._id}`)
                .then(res => {
                    setUserfriends(res.data.friends)
                    setTrigger(res.data.friends)
                })
                .catch(err => console.log(err))
        })


        return () => socket.disconnect(true)
    },[socket])

    useEffect(() => {

        if(displayList === 'Online') {
            // Online status === online
            setDisplayUsers(userFriends.filter(friend => friend.onlineStatus === 'Online').filter(friend => friend.pending === undefined));
            setDisplayText("ONLINE")
        } else if( displayList === 'All') {
            // all friends            
            setDisplayUsers(userFriends.filter(friend => friend.pending === undefined));
            setDisplayText("ALL FRIENDS")
        } else if (displayList === 'Pending') {
            // pending friend requests
            setDisplayUsers(userFriends.filter(friend => friend.pending).filter(friend => friend.pending[0] === true))
            setDisplayText("PENDING")
        } else if (displayList === 'Blocked') {
            // blocked users 
            setDisplayUsers([])
            setDisplayText("BLOCKED")
        } else if (displayList === "none") {
            setDisplayUsers([])
        }

    }, [displayList, userFriends])

    useEffect(() => {

        if(trigger.friends) {
            setDisplayUsers(trigger.friends);
        }
    }, [trigger])

    const acceptRequest = (pend) => {

        let userFriends = displayUsers.filter(friend => friend._id === pend._id);
        delete userFriends[0].pending;

        axios.put(`http://localhost:8000/api/users/${user._id}`, {
            friends: userFriends
        })
            .then(res => {
                setUserfriends(res.data.friends);
                axios.get(`http://localhost:8000/api/users/one/${pend._id}`)
                    .then(res => {
                        let userFriends = res.data.friends.filter(friend => friend._id === user._id)
                        delete userFriends[0].pending;

                        axios.put(`http://localhost:8000/api/users/${pend._id}`, {
                        friends: userFriends
                    })
                        .then(res => {
                            socket.emit('send_friend_request')
                        })
                        .catch(err => console.log(err))
                })
                
                setTrigger(res.data)
            })
            .catch(err => console.log(err))
    }

    const cancelRequest = (pend) => {
        
        let userFriends = displayUsers.filter(friend => friend._id !== pend._id)

        axios.put(`http://localhost:8000/api/users/${user._id}`, {
            friends: userFriends
        })
            .then(res => {
                setUserfriends(res.data.friends);
                axios.get(`http://localhost:8000/api/users/one/${pend._id}`)
                    .then(res => {
                        let userFriends = res.data.friends.filter(friend => friend._id !== user._id)

                        axios.put(`http://localhost:8000/api/users/${pend._id}`, {
                        friends: userFriends
                    })
                        .then(res => {
                            socket.emit('send_friend_request')
                        })
                        .catch(err => console.log(err))
                })
                
                setTrigger(res.data)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            {displayList !== "none" && <p className="TEST">{displayText} - {displayUsers.length}</p>}

        <div>
            {displayUsers.map((user,i) =>{
                return <div className="peopleListItemContainer inner" style={{display: "flex", flexDirection: "row-reverse"}}  key={i}>
                    <div className="peopleListItemActions">
                            

                            {user.pending ? 
                                user.pending[0] && !user.pending[1] ?
                                <div onClick={() => cancelRequest(user)}  className="peopleListItemButtonPend">
                                    <svg className="peopleListPending" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                                    </svg>
                                </div>
                                :                                
                                <>
                                    <div onClick={() => acceptRequest(user)} className="peopleListItemButtonPendConfirm">
                                        <svg className="icon-35-fSh" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path>
                                        </svg>
                                    </div>
                                    <div onClick={() => cancelRequest(user)} className="peopleListItemButtonPend">
                                        <svg className="peopleListPending" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                                        </svg>
                                    </div>
                                </>

                                
                                :
                                user.blocked ? <p>Blocked</p>
                                :
                                <>
                                <div  onClick={() => joinChat(user)} className="peopleListItemButton">
                                    <svg className="peopleListItemIcon"  aria-hidden="false" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path>
                                    </svg>
                                </div>
                                <div onClick={() => setDisplayMore(true)} className="peopleListItemButton">
                                    <svg className="icon-35-fSh" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="M24 0v24H0V0z"></path>
                                            <path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"></path>
                                        </g>
                                    </svg>
                                    { displayMore && <div onMouseLeave={() => setDisplayMore(false)} className="displayMore">
                                        <div onClick={() => cancelRequest(user)} className="removeFriend">
                                            <h3>Remove Friend</h3>
                                        </div>
                                    </div>}
                                </div>
                                </>}
                
                            
                            
                            </div>
                    <div onClick={(e) => joinChat(user)} style={ { height: "inherit" } } className="peopleListItemContents">
                        <div className="peopleListItemUserInfo">
                            <div className="peopleListItemAvatar">
                                <svg className="dm-userAvatar" style={{ backgroundColor: `#${user.hexColor}` }} aria-hidden="false" width="32" height="32" viewBox="-3 0 33 20">
                                    <path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                                </svg>
                            </div>
                            <div className="peopleListItemText">
                                <div className="peopleListItemNameTag">
                                    {user.userName}
                                </div>
                                <div className="peopleListItemSubtext">
                                    {user.onlineStatus}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            })}
        </div>
        </>
    )

}

export default FriendsList;