import React from "react";
import "../css/Icons.css";
import "../css/LoginReg.css";

import SignIn from "../components/Login";
import RegistrationForm from "../components/RegistrationForm"

const LoginReg = (props) => {
    const { setLoggedIn } = props;

    return (
        <div className="wrapper">
            <div className="loginPage">
                <div className="signIn">
                    <SignIn setLoggedIn={setLoggedIn} />
                </div>
                <div className="register">
                    <RegistrationForm setLoggedIn={setLoggedIn}/>
                </div>
            </div>
        </div>
    );
};

export default LoginReg;
