require('dotenv').config();

const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const chatController = require('./controllers/chat.controller');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./config/mongoose.config")(process.env.DB_NAME);
require('./routes/fakeassdiscord.routes')(app);



const server = app.listen(port, () => 
console.log('The server is up on port 8000'));

const io = require('socket.io')(server, {cors : true});


io.on('connection', socket => {


    socket.on('send_to_server', data => {
        chatController.getOneChatAndUpdateServer(data)

        socket.broadcast.emit('new_message_from_server', data)
    })

    socket.on('new_dm', data => {
        socket.broadcast.emit('show_new_dm', data);
    })

    socket.on('send_friend_request', ()=> {
        socket.broadcast.emit('receive_friend_request')
    })

    socket.on('disconnect', data => {
        if(data === 'transport close') {
            // console.log(data,"dsadsa");
        }
        socket.broadcast.emit('user_offline', "OFFLINE" );
    })

    socket.on('user_online', data => {
        // console.log(data);
        // console.log("ONINE");
        
    })
    
}) 
