import React, { useEffect, useState} from 'react';
import "../css/DMs.css"
import axios from 'axios';
import SearchAll from "../components/SearchAll"


const DMsSearch = (props) => {

    const [display, setDisplay] = useState(false);




    return (
        <div className="dm-searchBar">
            {display && <SearchAll/>}
            <form>
                <input type="text"
                onClick={() => setDisplay(!display)}
                placeholder="Find or Start a conversation"
                style={{width: "220px"}}
                className="dm-Search" />
            </form>

        </div>
    )
}

export default DMsSearch;