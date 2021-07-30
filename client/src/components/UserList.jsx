import React, { useState, useEffect } from 'react';
import '../css/Chat.css';
import axios from 'axios';
import FriendsList from './FriendsList';

const UserList = (props) => {
    const { user } = props;
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
            setCount(userCount);
            setUsers(userList.filter(singleUser => singleUser._id !== user._id ))
            setLoaded(true)
            console.log(users)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        <div className="peopleListItemContainer">
            <p className="TEST">ALL USERS - {count}</p>
            {loaded && 
            <FriendsList users={ users } /> }
        </div>
    )
}
export default UserList;