require('dotenv').config();

const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./config/mongoose.config")(process.env.DB_NAME);
require('./routes/fakeassdiscord.routes')(app);



const server = app.listen(port, () => 
console.log('The server is all UwU"d up on port 8000'));

const io = require('socket.io')(server, {cors : true});


io.on('connection', socket => {


    socket.on('send_to_sender', data => {
        socket.broadcast.emit('new_message_from_server', data)
    })


}) 