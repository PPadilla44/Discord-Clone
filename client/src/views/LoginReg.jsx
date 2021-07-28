import React from "react";
import "../css/Icons.css"

import SignIn from "../components/Login";
import RegistrationForm from "../components/RegistrationForm"

const LoginReg = ({ setLoggedIn }) => {
    return (
        <div className="loginPage">
            <div>
            <SignIn setLoggedIn={setLoggedIn} />
            </div>
            <div>
            <RegistrationForm/>
            </div>
        </div>
    );
};

export default LoginReg;
