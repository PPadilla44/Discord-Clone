import React from 'react';
import "./App.css"
import {Redirect, Router} from "@reach/router";
import Main from "./views/Main"

// /groupId/chatId

function App() {

  return (

    <Router className="App">
        <Redirect from="/channels/" to="/channels/@me" noThrow="true" />
        <Main path="/channels/:groupId/:chatId"/>
        <Main path="/channels/:groupId"/>

    </Router>

  );
}


export default App;
