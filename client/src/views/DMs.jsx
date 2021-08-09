import React, { useState, useEffect, useRef } from "react";
import DMsSearch from "../components/DMsSearch";
import User from "../components/User"
import FindDM from "../components/FindDM";
import axios from 'axios';
import "../css/DMs.css"
import { navigate } from "@reach/router";
import io from 'socket.io-client';


const DMs = (props) => {

    const { user, setChat, currentChat, setNewDM, setBlur } = props;
    const [allChats, setAllChats] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [ displayDMSearch, setDisplayDMSearch ] = useState(false);
    const wrapperRef = useRef(null)


    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, []);

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if(wrap && !wrap.contains(e.target)) {
            setDisplayDMSearch(false);
        }
    }

    useEffect(() => {
        socket.on('show_new_dm', data => {

            var hasUser = false;
            let i = 0;
            while (i < data.users.length && !hasUser) {
                let name = data.users[i];
                if (name.userName === user.userName) {
                    hasUser = true;
                }
                i++;
            }
            if (hasUser) {
                setAllChats(prevChats => [...prevChats, data])
            }

        })

        return () => socket.disconnect(true)

    }, [socket, user.userName])



    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/chats/${user._id}`)
            .then(res => {
                if(res.data[0] !== null) {
                    if(res.data.length > 0) {
                        setAllChats(res.data)

                        setLoaded(true)
                    }
                }

            })
            .catch(err => console.log(err))
    }, [user])



const submitChat = (chat) => {
    setChat(chat);
    axios.put(`http://localhost:8000/api/chats/${chat._id}`, {
        newMessage: false
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    navigate(`/channels/@me/${chat._id}`);

}

const goHome = () => {
    setChat({})
    navigate(`/channels/@me`)
}

const removeFromDM = (chat) => {
    let tempChats = allChats;
    tempChats.splice(tempChats.indexOf(chat));
    axios.put(`http://localhost:8000/api/users/${user._id}`, {
        chats: tempChats,
    })
        .then(res => {
            navigate(`/channels/@me`);
            setChat({});
            goHome();
        })
        .catch(err => console.log(err))
}

return (

    <div className="dm-main">
        <DMsSearch user={user} setBlur={setBlur} setNewDM={setNewDM} />

        <div className="dm-allUsers">
            <div onClick={goHome} className="dm-friendsTab" style={!currentChat._id ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }}>
                <svg style={{ marginRight: "9px" }} x="0" y="0" className="icon-22AiRD" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd">
                        <path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path>
                        <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                    </g>
                </svg>
                <h4>Friends</h4>
            </div>
            <div ref={wrapperRef} className="dm-newMsg">
                <h4>DIRECT MESSAGES</h4>
                <svg onClick={() => setDisplayDMSearch(!displayDMSearch)} className="dm-newMsgPlus" x="0" y="0" aria-hidden="false" width="16" height="16" viewBox="0 0 18 18"><polygon filerule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon></svg>
                {displayDMSearch && <FindDM user={user} setDisplayDMSearch={setDisplayDMSearch} setNewDM={setNewDM}/>}
            </div>
            {loaded && allChats.map((chat, i) => {
                return <div key={i} onClick={() => submitChat(chat)} className="dm-convo dm-convotooltip" style={chat._id === currentChat._id ? { backgroundColor: "rgb(57,60,67)", color: "white" } : { backgroundColor: "inherit" }}>
                    <svg className="dm-icon" style={{ backgroundColor: `#${chat.users.filter(other => other.userName !== user.userName).map(other => other.hexColor)}` }} aria-hidden="false" width="24" height="20" viewBox="-4 0 35 20">
                        <path style={{ color: 'white' }} fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                    </svg>
                    <div className="dm-container">
                        <h4>{chat.users.filter(other => other.userName !== user.userName).map(other => other.userName)}</h4>
                        <svg onClick={() => removeFromDM(chat) } className="dm-convotooltipx dm-close" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                        {chat.newMessage && <div className="newMessageIndicator"/>}

                    </div>

                </div>
            })}
        </div>
        <User user={user} />
    </div>

)

}

export default DMs;