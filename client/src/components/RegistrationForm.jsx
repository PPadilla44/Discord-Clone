import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

import "../css/LoginReg.css";

const RegistrationForm = (props) => {

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const { setLoggedIn } = props;

    const onSubmitHandler = e => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", {
            userName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        },{withCredentials: true,})
        .then((res) => {
            setLoggedIn(true);
            navigate("/channels")
            })
        .catch((err) => {
            console.log(err)

            const errorResponse = err.response.data;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            //sets errors to the array
            setErrors(errorArr);
        });
    };
    

    return (
        <div className="signInForm">
            <h1 className="h1">Register:</h1>
            <form onSubmit={onSubmitHandler}>
            {errors.map((err,i) => <p key ={i}>{err}</p>)}
            <p>
                <label>Username: </label><br/>
                <input type="text" onChange={(e)=>setUserName(e.target.value)} value={userName}/>
            </p>
            <p>
                <label>First Name:</label><br/>
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
            </p>
            <p>
                <label>Last Name:</label><br/>
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
            </p>
            <p>
                <label>Email:</label><br/>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </p>
            <p>
                <label>Password:</label><br/>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </p>
            <p>
                <label>Confirm Password:</label><br/>
                <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
            </p>
            <input type="submit" value = "Sign up!" className="button"/>
        </form>
        </div>
    )
}


export default RegistrationForm;