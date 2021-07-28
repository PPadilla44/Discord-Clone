import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const SignIn = ({setLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);

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
        console.log(res);
        setLoggedIn();
        navigate("/users");
    })
        .catch((err) => {
            const errorResponseMessage = err.response.data.errors;
            const errorArrMessage = [];
            for(const key of Object.keys(errorResponseMessage)){
                errorArrMessage.push(errorResponseMessage[key].message)
            }
            //sets errors to the array
            setErrorMessage(errorArrMessage);
            console.log(err)
        });
    };
    return (
        <div>
            <h1>Sign in:</h1>
            <form onSubmit={login}>
            {errorMessage.map((err,i) => <p key ={i}>{err}</p>)}
            <p>
                <label>Email: </label><br/>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </p>
            <p>
                <label>Password: </label><br/>
                <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </p>
            <input type="submit" value = "Sign In!"/>
        </form>
            
        </div>
    )}


export default SignIn
