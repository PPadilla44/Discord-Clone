import React from 'react';
import "../css/DMs.css"


const DMsSearch = (props) => {



    return (
        <div className="dm-searchBar">

            <form>
                <input type="text"
                placeholder="Find or Start a conversation"
                style={{width: "220px"}}
                className="dm-Search" />
            </form>

        </div>
    )
}

export default DMsSearch;