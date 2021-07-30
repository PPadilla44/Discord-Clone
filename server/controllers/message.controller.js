const { Message } = require('../models/message.model');

module.exports = {

    createNewMessage: (req, res) => {
        const { contents, user, chatId } = req.body;
        Message.create( {contents, user, chatId } )
            .then(message => res.json(message))
            .catch(err => res.status(400).json(err));
    },

    getChatMessages: (req, res) => {
        Message.find({ chatId: req.params.chatId } )
            .then(messages => res.json(messages))
            .catch(err => res.status(400).json(err));
    },

}