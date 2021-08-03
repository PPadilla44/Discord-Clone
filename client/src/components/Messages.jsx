import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import '../css/Chat.css';


const Messages = (props) => {


    const [socket] = useState(() => io(':8000'));

    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [trigger, setTrigger] = useState({});

    const { chat } = props;



    useEffect(() => {

        axios.get(`http://localhost:8000/api/chats/${chat._id}`)
            .then(res => {
                console.log(res.data.messages);
                    setMessages(res.data.messages.reverse());
                    setLoaded(true);
            })
            .catch(err => console.log(err));


    }, [chat])

    useEffect(() => {


        socket.on('new_message_from_server_save', data => {
            axios.get(`http://localhost:8000/api/chats/${data.chatId}`)
                .then(res => {
                    
                    let { messages : chatMessages} = res.data;
                    chatMessages.push(data);

                    axios.put(`http://localhost:8000/api/chats/${data.chatId}`,{
                        messages : chatMessages
                    })
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            

        });

        socket.on("new_message_from_server", data => {
            setTrigger(data);
        });
        

    }, [socket])

    useEffect(() => {

        
            if(trigger.chatId === chat._id) {
                setMessages(prevMsgs => {
                    return [trigger, ...prevMsgs]
                    }   
                )
            }
        

    }, [trigger, chat._id])


    return (

        <div className="chatBox">
        <ul className="chatMessages">
            
            {loaded && messages.map((m, i) => {
                return <div key={i} className="messageContainer">
                    <div className="chatContents">
                        <svg className="avatar" style={{ backgroundColor: `#${m.user.hexColor}` }} aria-hidden="false" width="24" height="20" viewBox="-4 0 35 20">
                            <path style={{ color: 'white' }} fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path>
                        </svg>
                        <h2 className="ChatMessageHeader">
                            <span className="ChatMessageHeaderUserName">{m.user.userName}</span>
                            <span className="ChatMessageHeaderTimestamp">{new Date(m.createdAt).toLocaleDateString()}</span>
                        </h2>
                        <div className="ChatMessageContent">{m.contents}</div>
                    </div>
                </div>
            })}
            <div className="chatSeperator" >
                <span className="chatDate">July 23, 2021</span>
            </div>
        </ul>
    </div>

    )
}

export default Messages;