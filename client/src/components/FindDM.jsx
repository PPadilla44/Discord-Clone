import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { navigate } from "@reach/router";

const FindDM = (props) => {

    const { user, setNewDM, setDisplayDMSearch } = props;

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState("");

    const [found, setFound] = useState(true);

    const [socket] = useState(() => io(':8000'));

    useEffect(()  => {
        setOptions(user.friends.filter(friend => friend.pending === undefined))
    },[user.friends])

    const joinChat = useCallback( async (e) => {

        setDisplayDMSearch(false)

        let secondUserId = e._id;
        let users = [ user, e]

        await axios.get(`http://localhost:8000/api/chats/user/single/${ user._id}/${ secondUserId }`)
            .then(res => {
                if((res.data).length > 0) {
                    navigate(`/channels/@me/${res.data[0]._id}`);
                }

                else {
                    axios.post('http://localhost:8000/api/chats',{
                        users,
                        newMessage: true,
                    })
                        .then(res => {
                            let chatId = res.data._id;
                            axios.get(`http://localhost:8000/api/users/one/${secondUserId}`)
                                .then(res => {
                                    let friendChats = res.data.chats;
                                        axios.put(`http://localhost:8000/api/users/${secondUserId}`, {
                                            chats: [...friendChats, chatId],
                                        })
                                        .then(res => console.log(res.data))
                                        .catch(err => console.log(err));
                                    })

                            axios.put(`http://localhost:8000/api/users/${user._id}`, {
                                chats: [...user.chats, chatId],
                            })
                                .then(res => console.log(res.data))
                                .catch(err => console.log(err));
                            socket.emit('new_dm', res.data)
                            setNewDM(res.data)
                            navigate(`/channels/@me/${chatId}`) })
                        .catch(err => console.log(err));
                    }
                }
            )
            .catch(err => {
                console.log(err);
            })
    }, [setNewDM, socket, user, setDisplayDMSearch])

    const joinChatHandler = (e) => {
        e.preventDefault()

        if(search.length < 1) {
            setFound(false)
        } else {

        axios.get(`http://localhost:8000/api/users/${search}`)
            .then(res => {
                console.log(res.data);
                if(res.data === null) {
                    setFound(false);
                } else {
                    setFound(true)
                    // if(user.friends.includes(res.data)) {
                    // }
                    joinChat(res.data)
                }
            })
            .catch(err => console.log(err))
        }
    }


    return (
        <div className="FindDM-main">
            <form className="FindDM-form" onSubmit={(e) => joinChatHandler(e)}>
                <h2>Select Friends</h2>
                <p>You can add 9 more friends</p>
                { !found && <h3 style={{color: "red", textAlign : "center"}}>User not found in your friends list</h3> }
                <input 
                autoComplete={"off"}
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type the username of a friend"
                className="FindDM-input"
                type="text" />
                <div className="FindDM-usersContainer">
                    {options
                            .filter(({userName}) => userName.toLowerCase().indexOf(search.toLowerCase()) > -1 )
                            .slice(0,10)
                            .map((v, i) => {
                                return  (
                                    <div key={i} onClick={() => joinChat(v)} className="FindDM-oneOption" tabIndex='0'>
                                        <svg className="FindDM-icon" style={ { backgroundColor : `#${v.hexColor}`} } aria-hidden="false" width="24" height="20" viewBox="-4 0 35 20">
                                            <path style={{ color: 'white' }} fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                                        </svg>
                                        <h3>{v.userName}</h3>
                                    </div>
                                )
                            })}
                    {options.length < 1 && <h3 style={{textAlign: "center"}}>Add some friends to send a message</h3>}
                </div>
                <div className="FindDM-btn">
                    <input className="FindDM-submit" type="submit" value="Create Group DM" />
                </div>
            </form>
        </div>
    )
}

export default FindDM