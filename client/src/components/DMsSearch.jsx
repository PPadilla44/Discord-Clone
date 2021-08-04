import React, { useEffect, useState, useRef} from 'react';
import "../css/DMs.css"
import SearchAll from "../components/SearchAll"


const DMsSearch = (props) => {

    const { setBlur, user, setNewDM } = props;

    const [displaySearch, setDisplaySearch] = useState(false);

    const wrapperRef = useRef(null)



    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if(wrap && !wrap.contains(e.target)) {
            setDisplaySearch(false);
            setBlur(false);
        }
    }

    const handleShowInput = () => {
        setDisplaySearch(!displaySearch);
        setBlur(true)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, []);

    return (
        <div className="dm-searchBar" ref={wrapperRef}>
            {displaySearch && <SearchAll user={user} setDisplaySearch={setDisplaySearch} setBlur={setBlur} setNewDM={setNewDM}/>}
            <form>
                <input 
                type="text"
                onClick={handleShowInput}
                placeholder="Find or Start a conversation"
                style={{width: "220px"}}
                className="dm-Search" />
            </form>
        </div>
    )
}

export default DMsSearch;