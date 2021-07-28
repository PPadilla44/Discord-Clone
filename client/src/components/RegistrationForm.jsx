import React, { useState } from "react";
import axios from "axios";

export default props => {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", {
            withCredentials: true,
            userName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        })
        .then((res) => {
            console.log(res);
            })
        .catch((err) => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            //sets errors to the array
            setErrors(errorArr);
            console.log(err)
        });
    };
    

    return (
        <div>
            <h1>Register Biatch</h1>
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
                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </p>
            <p>
                <label>Password:</label><br/>
                <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </p>
            <p>
                <label>Confirm Password:</label><br/>
                <input type="text" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
            </p>
            <input type="submit" value = "Sign up!"/>
        </form>
        </div>
    )
}


