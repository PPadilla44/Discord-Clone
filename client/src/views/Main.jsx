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


    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/users/loggedin`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data)
                setLoaded(true)
                setCheckLog(true)
            })
            .catch((err) => {
                setLoaded(true)
                setCheckLog(false)
                navigate('/login');
            });
    }, []);

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
                <DMs user={user} groupId={props.groupId} />
                <Chat user={user} chatId={props.chatId} />
            </>
            
        }
            

        </>
    );
};

export default Main;
