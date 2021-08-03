const User = require("../models/user.model");
const { Chat } = require('../models/chat.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function randomHex() {
    const hexArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    let hex = ""
    for(let i = 0; i < 6; i++) {
        hex += hexArr[Math.floor(Math.random() * 16)];
    }
    return hex
}

// export an object that is full of methods
module.exports = {
    register: (req, res) => {
        const user = new User(req.body);
        
        user.hexColor = randomHex();
        user.onlineStatus = "Online";
        
        user.save().then(() => {
                res.cookie(
                    "usertoken",
                    jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                    {
                        httpOnly: true,
                    }
                )
                .json({ msg: "success!" });
            })
            .catch((err) => res.status(400).json(err));
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt" });
                } else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((passwordIsValid) => {
                            if (passwordIsValid) {

                                res.cookie(
                                        "usertoken",
                                        jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                                        {
                                            httpOnly: true,
                                        }
                                    )
                                    .json({ msg: "success!" });
                            } else {
                                res.status(400).json({ msg: "invalid login attempt" });
                            }
                        })
                        .catch((err) => {
                            res.status(400).json({ msg: "invalid login attempt" });
                        });
                }
            })
            .catch((err) => res.json(err));
    },

    logout: (req, res) => {
        res
            .cookie("usertoken", jwt.sign({ _id: "" }, process.env.JWT_SECRET), {
                httpOnly: true,
                maxAge: 0,
            })
            .json({ msg: "ok" });
    },

    logout2: (req, res) => {
        res.clearCookie("usertoken");
        res.json({ msg: "usertoken cookie cleared" });
    },

    getLoggedInUser: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        User.findById(decodedJWT.payload._id)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },

    getAll: (req, res) => {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(400).json(err));
    },

    getOne: (req, res) => {
        User.findOne({ _id: req.params._id })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },

    getOneByUserName: (req, res) => {
        User.findOne({userName: req.params.userName})
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },


    updateOne: (req, res) => {
        User.findOneAndUpdate( { _id: req.params._id }, req.body, { new: true } )
            .then(updatedOne => {
                res.json(updatedOne)
            })
            .catch((err) => res.status(400).json(err));
    },

    getUserChats: (req, res) => {
        User.findOne({ _id: req.params._id })
            .then((user) => {
                
                const promises = [];

                for(const _id of user.chats) {
                    promises.push(
                        Chat.findOne( { _id } )
                            .then(chat => chat)
                            .catch(err => res.status(400).json(err))
                    )
                }

                Promise.all(promises)
                    .then((p) => {
                        res.json(p)
                    })


            })
            .catch((err) => res.status(400).json(err));

    }

};
