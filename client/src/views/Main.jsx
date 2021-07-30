import React, { useState, useEffect } from "react";
import { navigate } from '@reach/router'
import axios from "axios";
import Icons from "./Icons";
import DMs from "./DMs";
import Chat from "./Chat";

const Main = (props) => {


    const { isLoggedIn } = props;
    const [checkLog, setCheckLog] = useState(isLoggedIn);
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false);
    const [checkingLoginStatus, setCheckingLoginStatus] = useState(false);

    const [chat, setChat] = useState({});


    useEffect(() => {

        axios.get(`http://localhost:8000/api/users/loggedin`, {
            withCredentials: true,
        })
            .then((res) => {
                setUser(res.data)
                setLoaded(true);
                setCheckLog(true);
                setCheckingLoginStatus(true)
            })
            .catch((err) => {
                setCheckLog(false);
                setLoaded(false);
                setCheckingLoginStatus(false)
                navigate('/login');
            });


            if (checkingLoginStatus) {
                if(checkLog) {
                    if(props.chatId) {
                        axios.get(`http://localhost:8000/api/chats/${props.chatId}`)
                        .then(res => {
                            let foundUser = false
                            let i = 0;
                            let listOfUsers = res.data.users;
                            while(!foundUser && i < listOfUsers.length){
                                if( listOfUsers[i].userName === user.userName) {
                                    setChat(res.data);
                                    foundUser = true;
                                }
                                i++;
                            }
                            if(!foundUser) {
                                navigate('/channels/@me');
                            }
                            
                        })
                        .catch(err => {
                            navigate('/channels/@me')
                        });
                    } 
                }
        }

    }, [checkingLoginStatus, loaded]);

    const logout = () => {
        axios
            .post(
                "http://localhost:8000/api/logout",
                {},
                {
                    // need to send the cookie in request so server can clear it
                    withCredentials: true,
                }
            )
            .then((res) => {
                setCheckLog(false);
            })
            .catch(err => {
                console.log(err);
            });

        navigate('/login')
    };


    return (
        <>
            {loaded &&
                <>
                    {/* {checkLog && <button onClick={logout}>Logout</button>} */}
                    <Icons user={user} />
                    <DMs setChat={setChat} user={user} groupId={props.groupId} />
                    <Chat user={user} chat={chat} />
                </>

            }


        </>
    );
};

export default Main;
