const express = require("express");
const app = express();
const port = 8000;


const server = app.listen(port, () => 
console.log('The server is all UwU"d up on port 8000'));

const io = require('socket.io')(server, {cors : true});

io.on('connection', socket => {

    // socket.on('join', data => {
    //     console.log(data);
    // })


}) 