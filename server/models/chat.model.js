const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users: {
        type: Array
    },
    messages: {
        type: Array
    }
})

module.exports.Chat = mongoose.model('Chat', ChatSchema);