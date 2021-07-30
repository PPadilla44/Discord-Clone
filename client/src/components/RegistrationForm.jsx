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
    const [friends, setFriends] = useState([]);
    const [errors, setErrors] = useState({});

    const { setLoggedIn } = props;

    const onSubmitHandler = e => {
        e.preventDefault();
        setFriends([]);

        axios.post("http://localhost:8000/api/register", {
            userName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            friends
        },{withCredentials: true,})
        .then((res) => {
            setLoggedIn(true);
            navigate("/channels")
            })
        .catch(err => {
            console.log(err.response);
            console.log(err.response.data)

            const errorResponse = err.response.data.errors;
            setErrors(errorResponse);
            console.log(errors);
        });
    };
    

    return (
        
        <div className="signInForm">
            <h1 className="h1">Register:</h1>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Username: </label><br/>
                    <input type="text" onChange={(e)=>setUserName(e.target.value)} value={userName}/>
                    <p className = "valError">{errors.userName ? errors.userName.message : <br/>}</p>
                </p>
                <p>
                    <label>First Name:</label><br/>
                    <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                    <p className = "valError">{errors.firstName ? errors.firstName.message : <br/>}</p>
                </p>
                <p>
                    <label>Last Name:</label><br/>
                    <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                    <p className = "valError">{errors.lastName ? errors.lastName.message :<br/>}</p>
                </p>
                <p>
                    <label>Email:</label><br/>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <p className = "valError">{errors.email ? errors.email.message : <br/>}</p>
                </p>
                <p>
                    <label>Password:</label><br/>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <p className = "valError">{errors.password ? errors.password.message : <br/>}</p>
                </p>
                <p>
                    <label>Confirm Password:</label><br/>
                    <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    <p className = "valError">{errors.confirmPassword ? errors.confirmPassword.message : <br/>}</p>
                </p>
                <input type="hidden" name="friends" value={friends} />
                <input type="submit" value = "Sign up!" className="button"/>
            </form>
            
        </div>
        
    )
}


export default RegistrationForm;