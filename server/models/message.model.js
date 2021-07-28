const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    contents: {
        type: String
    },
    senderUserName: {
        type: String
    },
    chatId: {
        type: String
    }

}, {timestamps: true });

module.exports.Message = mongoose.model('Message', MessageSchema);