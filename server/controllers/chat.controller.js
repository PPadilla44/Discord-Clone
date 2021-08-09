const { Chat } = require('../models/chat.model');

module.exports = {

    createNewChat: (req, res) => {
        const { users, messages, newMessage } = req.body;
        Chat.create({ users, messages, newMessage })
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json(err));
    },

    getOneChat: (req, res) => {
        Chat.findOne({ _id: req.params._id })
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json(err));
    },

    getOneChatAndUpdateServer: (data) => {
        Chat.findOne({_id : data.chatId })
        .then(chat => {
            const { messages } = chat;
            
            messages.push(data);
            let pushedData = {
                messages
            }

            Chat.findOneAndUpdate( { _id: chat._id }, pushedData, { new: true} )
                .then(updatedChat => updatedChat)
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    },

    updateOneChat: (req, res) => {
        Chat.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .then(updatedChat => {
                res.json(updatedChat)
            })
            .catch(err => res.status(400).json(err))
    },

    getAllChatsWithUser: (req, res) => {
        Chat.find()
            .then(chats => {
                let userChats = [];
                const { userName } = req.params;
                for (const chat of chats) {
                    let users = chat.users;
                    for (const user of users) {

                        if (userName === user.userName) {
                            userChats.push(chat);

                        }
                    }
                }
                res.json(userChats);
            })
            .catch(err => res.status(400).json(err))
    },

    getChatBetweenTwoUsers: (req, res) => {
        Chat.find({
            $and: [
                { "users": { $elemMatch: { "_id": req.params._id } } },
                { "users": { $elemMatch: { "_id": req.params._id2 } } }
            ]
        })
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json(err))
    }


}