module.exports = app =>{
    const chatItem = require("../controllers/messages.controller.js");

    app.post("/msg", chatItem.create);
    app.get("/msg", chatItem.findAll);
    app.get('/msg/user/count/:chatId/:type', chatItem.countActiveMessages)
    app.get("/msg/user/:chatId", chatItem.getById);
    app.get("/msg/user/chat/:chatId", chatItem.getChatById);
    app.post("/msg/status/:chatId/:userId", chatItem.closeMessage);
    app.patch("/msg/hide/:msgId/0", notif.msgHide);
}