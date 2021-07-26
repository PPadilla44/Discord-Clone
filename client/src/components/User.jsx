import React from "react";

const User = (props) => {



    return (
        <div className="dm-user">
            <img className="dm-userAvatar" src="https://cdn.discordapp.com/avatars/537805209460539428/91a36ff715aea2eb46c7e10dd4e832ac.png?size=128"/>
            <div className="dm-userCreds">
                <p>Famish</p>
                <h5>#4667</h5>
            </div>
            <div className="dm-userIcons">
                <div className="dm-oneUserIcon">
                    <div className="dm-oneUserIconImage"/>
                </div>
                <div className="dm-oneUserIcon">
                    <div className="dm-oneUserIconImage"/>
                </div>
                <div className="dm-oneUserIcon">
                    <div className="dm-oneUserIconImage"/>
                </div>
            </div>
        </div>
    )
}

export default User;