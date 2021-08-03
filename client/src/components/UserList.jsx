import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../css/Chat.css';
import axios from 'axios';
import FriendsList from './FriendsList';
import { navigate } from '@reach/router';
import io from 'socket.io-client';


const UserList = (props) => {

    const { user, setChat, setNewDM, displayList } = props;
    const [ users, setUsers ] = useState();
    const [ loaded, setLoaded ] = useState(false);
    const [ count, setCount ] = useState(0);

    const [socket] = useState(() => io(':8000'));


    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/users')
    //     .then(res => {
    //         let userList = res.data;
    //         let userCount = 0;

    //         for(let i = 0; i < userList.length; i++) {
    //             userCount++
    //         }
    //         setCount(userCount - 1);
    //         setUsers(userList.filter(singleUser => singleUser._id !== user._id ))
    //         setLoaded(true)
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    const joinChat = useCallback( async (e) => {




        let secondUserId = e._id;
        console.log(secondUserId);
        let users = [ user, e]

        await axios.get(`http://localhost:8000/api/chats/user/single/${ user._id}/${ secondUserId }`)
            .then(res => {
                if((res.data).length > 0) {
                    navigate(`/channels/@me/${res.data[0]._id}`);
                }

                else {
                    axios.post('http://localhost:8000/api/chats',{
                        users,
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
                console.log('fail');
                console.log(err);
            })
    }, [])

    return (
        <div className="peopleListItemContainer">
            <FriendsList setChat={ setChat } user={user} displayList={displayList} users={ users } joinChat={ joinChat } />
        </div>
    )
}
export default UserList;