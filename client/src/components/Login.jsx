import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import "../css/LoginReg.css";

const SignIn = ({setLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/login",
        { 
            email, 
            password 
        },
        {
            withCredentials: true
        }
        )
        .then((res) => {
        setLoggedIn(true);
        navigate("/channels");
    })
        .catch((err) => {
            const errorResponse = err.response.data.msg;
            setErrors(errorResponse);
        });
    };
    return (
        <div className="signInForm">
            <h1 className="h1">Sign in:</h1>
            <form onSubmit={login}>
            <p>
                <label>Email: </label><br/>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </p>
            <p>
                <label>Password: </label><br/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </p>
            <br/>
            <p className = "valError">{errors ? errors : <br/>}</p>
            <input type="submit" value = "Sign In!"  className="button"/>
        </form>
            
        </div>
    )}


export default SignIn
