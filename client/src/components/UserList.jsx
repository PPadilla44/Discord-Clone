import React, { useState,useCallback} from 'react';
import '../css/Chat.css';
import axios from 'axios';
import FriendsList from './FriendsList';
import { navigate } from '@reach/router';
import io from 'socket.io-client';


const UserList = (props) => {

    const { user, setChat, setNewDM, displayList } = props;

    const [socket] = useState(() => io(':8000'));




    const joinChat = useCallback( async (e) => {


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
    }, [setNewDM, socket, user])

    return (
        <div className="peopleListItemContainer">
            <FriendsList setChat={ setChat } user={user} displayList={displayList} joinChat={ joinChat } />
        </div>
    )
}
export default UserList;