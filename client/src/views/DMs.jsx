import React, { useState } from "react";
import "../css/DMs.css"
import DMsSearch from "../components/DMsSearch";
import User from "../components/User"

const DMs = (props) => {
    const [ closeState, setCloseState ] = useState('none')

    const showClose = (e) => {
        // e.target.children[1].children[1].style.display = 'inline-block';
    }

    const closeClose = (e) => {        
        // e.target.children[1].children[1].style.display = 'none';
    }


    return (

        <div className="dm-main">
            <DMsSearch/>
            <div className="dm-allUsers">
                <div className="dm-newMsg">
                    <h4>DIRECT MESSAGES</h4>
                    <svg className="dm-newMsgPlus" x="0" y="0" aria-hidden="false" width="16" height="16" viewBox="0 0 18 18"><polygon filerule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon></svg>
                </div>
                <div className="dm-convo" onMouseEnter={ (e) => showClose(e) } onMouseLeave={(e) => closeClose(e) }>
                    <div className="dm-icon"/>
                    <div className="dm-container">
                        <h4>Dirty Milk Tea</h4>
                        <svg className="dm-close" style={{ display : `${closeState}`}} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="dm-convo" onMouseEnter={ (e) => showClose(e) } onMouseLeave={(e) => closeClose(e) }>
                    <div className="dm-icon"/>
                    <div className="dm-container">
                        <h4>Karma Refined</h4>
                        <svg className="dm-close" style={{ display : `${closeState}`}} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="dm-convo" onMouseEnter={ (e) => showClose(e) } onMouseLeave={(e) => closeClose(e) }>
                    <div className="dm-icon"/>
                    <div className="dm-container">
                        <h4>Kelthuzal</h4>
                        <svg className="dm-close" style={{ display : `${closeState}`}} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <User/>
        </div>

    )

}

export default DMs;