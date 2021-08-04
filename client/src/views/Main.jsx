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

    const [blur, setBlur] = useState(false)

    const [chat, setChat] = useState({});
    const [newDM, setNewDM] = useState({});




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

    }, [checkingLoginStatus, loaded, props.chatId, checkLog, user.userName]);


    // const logout = () => {
    //     axios
    //         .post(
    //             "http://localhost:8000/api/logout",
    //             {},
    //             {
    //                 // need to send the cookie in request so server can clear it
    //                 withCredentials: true,
    //             }
    //         )
    //         .then((res) => {
    //             setCheckLog(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });

    //     navigate('/login')
    // };


    return (
        <>
            {loaded &&
                <>
                    {/* {checkLog && <button onClick={logout}>Logout</button>} */}
                    { blur && <div className={"blurBackground"} style={{ opacity: '0.85', background: 'hsl(0, calc(var(--saturation-factor, 1) * 0%), 0%)', zIndex: '998' }}/>}
                    <Icons setChat={setChat} user={user} />
                    <DMs setBlur={setBlur} setChat={setChat} currentChat={chat} setNewDM={setNewDM} newDM={newDM} user={user} groupId={props.groupId} />
                    <Chat setChat={setChat} setNewDM={setNewDM} user={user} chat={chat} />
                </>

            }


        </>
    );
};

export default Main;
