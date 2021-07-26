import React from "react";
import "../css/Icons.css"

const Icons = (props) => {



    return(
        <div className="icons-main">
            <button className="icons-buttons icons-home">Home</button>
            <p className="home-separator">----</p>
            <button className="icons-buttons">Test 1</button>
            <button className="icons-buttons">Test 2</button>
            <button className="icons-buttons">Test 3</button>
            <button className="icons-buttons">+</button>
            <button className="icons-buttons">Explore</button>
        </div>
    )
}

export default Icons;