const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    contents: {
        type: String
    },
    user: {
        type: Object
    },
    chatId: {
        type: String
    }

}, {timestamps: true });

module.exports.Message = mongoose.model('Message', MessageSchema);