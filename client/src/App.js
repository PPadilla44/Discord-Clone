import React, { useState, useEffect } from "react";
import "./App.css"
import { Router, Redirect } from "@reach/router";
import Main from "./views/Main"
import LoginReg from "./views/LoginReg"
import axios from "axios";


// /groupId/chatId

function App() {


  const [loaded, setLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/loggedin`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoaded(true)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        setLoaded(true)
        setIsLoggedIn(false)
      });
  }, []);


  return (

    <Router className="App">
      {loaded &&
        <>
          <Redirect from="/" to="/login" noThrow="true" />
          <Redirect from="/channels/" to="/channels/@me" noThrow="true" />
          <Main isLoggedIn={isLoggedIn}  path="/channels/:groupId/:chatId" />
          <Main isLoggedIn={isLoggedIn} path="/channels/:groupId" />
          <LoginReg isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} path="/login" />
        </>
      }


    </Router>

  );
}


export default App;
