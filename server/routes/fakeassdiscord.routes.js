const UserController = require("../controllers/user.controller");
const MessageController = require('../controllers/message.controller');
const ChatController = require('../controllers/chat.controller');
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {

    // User Controller

    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);


    // this route now has to be authenticated
    app.get("/api/users", UserController.getAll);
    app.get(`/api/users/one/:_id`, UserController.getOne)
    app.get("/api/users/loggedin", authenticate, UserController.getLoggedInUser);
    app.get("/api/users/:userName", UserController.getOneByUserName);
    app.put("/api/users/:_id", UserController.updateOne);
    app.get("/api/users/chats/:_id", UserController.getUserChats)

    // Message Controller

    app.post('/api/messages', MessageController.createNewMessage);
    app.get('/api/messages/:chatId', MessageController.getChatMessages);

    // Chat Controller
    app.post('/api/chats', ChatController.createNewChat);
    app.get('/api/chats/:_id', ChatController.getOneChat);
    app.put('/api/chats/:_id', ChatController.updateOneChat);
    app.get('/api/chats/user/:userName', ChatController.getAllChatsWithUser);
    app.get('/api/chats/user/single/:_id/:_id2', ChatController.getChatBetweenTwoUsers);
}