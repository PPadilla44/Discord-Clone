import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import axios from 'axios';
import FriendsList from './FriendsList';

const UserList = (props) => {

    const { user, setChat } = props;
    const [ users, setUsers ] = useState();
    const [ loaded, setLoaded ] = useState(false);
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => {
            let userList = res.data;
            let userCount = 0;

            for(let i = 0; i < userList.length; i++) {
                userCount++
            }
            setCount(userCount - 1);
            setUsers(userList.filter(singleUser => singleUser._id !== user._id ))
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let userId2 = '610321383708344df0e004de';
        axios.get(`http://localhost:8000/api/chats/user/single/${ user._id}/${ userId2 }`)
            .then(res => {
                if((res.data).length > 0) {
                    console.log(res.data);
                }

                else {
                    console.log('nada');
                }
            })
            .catch(err => {
                console.log('fail');
                console.log(err);
            })
    }, [])


    return (
        <div className="peopleListItemContainer">
            <p className="TEST">ALL USERS - {count}</p>
            {loaded && 
            <FriendsList setChat={ setChat } user={user} users={ users } /> }
        </div>
    )
}
export default UserList;