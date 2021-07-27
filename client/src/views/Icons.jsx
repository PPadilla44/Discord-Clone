import React from "react";
import "../css/Icons.css"

const Icons = (props) => {



    return(
        <div className="icons-main">
            <button className="icons-buttons icons-home">Home</button>
            <p className="home-separator">_____</p>
            <button className="icons-buttons">Test 1</button>
            <button className="icons-buttons">Test 2</button>
            <button className="icons-buttons">Test 3</button>
            <button className="icons-buttons bi bi-plus-lg green"></button>
            <button className="icons-buttons bi bi-compass-fill green"></button>
        </div>
    )
}

export default Icons;