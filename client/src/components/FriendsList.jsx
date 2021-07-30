import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from '@reach/router';
import '../css/FriendsList.css';



const FriendsList =  props =>{
    const { user, users } = props;

    return (
        <div>
            {users.map((user,i) =>{
                return <div className="peopleListItemContainer">
                    {user.userName}
                    <button className = "friendNavButtons bi bi-chat-left"></button>
                    <button className = "friendNavButtons bi bi-three-dots-vertical"></button>
                        
                </div>
            })}
        </div>
    )

}

export default FriendsList;