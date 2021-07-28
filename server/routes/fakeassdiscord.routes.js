const UserController = require("../controllers/user.controller");
const MessageController = require('../controllers/message.controller');
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {

    // User Controller

    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);

    // this route now has to be authenticated
    app.get("/api/users", authenticate, UserController.getAll);
    app.get("/api/users/loggedin", authenticate, UserController.getLoggedInUser);
    


    // Message Controller

    app.post('/api/messages', MessageController.createNewMessage);
    app.get('/api/messages/:chatId', MessageController.getChatMessages);

}