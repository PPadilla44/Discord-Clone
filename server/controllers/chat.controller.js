const { Chat } = require('../models/chat.model');

module.exports = {

    createNewChat: (req, res) => {
        const { users } = req.body;
        Chat.create( { users } )
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json(err));
    },

    getOneChat: (req, res) => {
        Chat.findOne( { _id: req.params._id } )
            .then(chat => res.json(chat))
            .catch(err => res.status(400).json(err));
    },

    updateOneChat: (req, res) => {
        Chat.findOneAndUpdate( { _id: req.params.id}, req.body, { new: true} )
            .then(updatedChat => res.json(updatedChat))
            .catch(err => res.status(400).json(err))
    },

    getAllChatsWithUser: (req, res) => {
        Chat.find()
            .then(chats => {
                console.log(chats[chats.length-1].users);
                let userChats = [];
                const { userName } = req.params;
                for(const chat of chats) {
                    let users = chat.users;
                    for(const user of users) {
                        
                        if(userName === user.userName) {
                            userChats.push(chat);
                    
                        }
                    }
                }
                res.json(userChats);
            })
            .catch(err => res.status(400).json(err))
    },

    getChatBetweenTwoUsers: (req, res) => {
        Chat.find( { $and: [ 
                            { $or: [ { users: req.params[0]._id }, { users: req.params[1]._id } ] }, 
                            { $or: [ { users: req.params[0]._id }, { users: req.params[1]._id } ] }
                       ]
                   })
                   .then(console.log(res.data))
                   .catch(err => res.status(400).json(err))
    }


}