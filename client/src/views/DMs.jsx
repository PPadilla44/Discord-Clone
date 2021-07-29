import React, { useState, useEffect } from "react";
import DMsSearch from "../components/DMsSearch";
import User from "../components/User"
import axios from 'axios';
import "../css/DMs.css"
import { navigate } from "@reach/router";

const DMs = (props) => {
    const { user } = props;
    const [allUsers, setAllUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [chatId, setChatId] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => {
            setAllUsers(res.data)
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }, [])

    const openChat = (friend) => {
        let { userName } = friend;
        let users = [];

        users.push(userName)
        users.push(user.userName)

        axios.post('http://localhost:8000/api/chat', {

            users
        }
        )
            .then(res => {
                console.log(res.data)
                navigate(`/channels/@me/${res.data._id}`)
            })
            .catch(err => console.log(err))
        
    }

    return (

        <div className="dm-main">
            <DMsSearch/>
            <div className="dm-allUsers">
                <div className="dm-newMsg">
                    <h4>DIRECT MESSAGES</h4>
                    <svg className="dm-newMsgPlus" x="0" y="0" aria-hidden="false" width="16" height="16" viewBox="0 0 18 18"><polygon filerule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon></svg>
                </div>
                {/* map all users for now */}
                {loaded && allUsers.filter( friend => friend.userName !== user.userName ).map((friend, i) => {
                    return <div key={i} className="dm-convo dm-convotooltip">
                    <div className="dm-icon"/>
                    <div className="dm-container" onClick={() => openChat(friend) }>
                        <h4>{friend.userName}</h4>
                        <svg className="dm-convotooltipx dm-close" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
                })}
            </div>
            <User user={user}/>
        </div>

    )

}

export default DMs;