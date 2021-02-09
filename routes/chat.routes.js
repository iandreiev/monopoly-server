module.exports = app =>{
    const chat = require("../controllers/chat.controller");
    

    app.post("/chat", chat.create);
    app.get("/chat", chat.findAll);
    app.get("/chat/:chatId", chat.findOne);
    app.get("/chat/current/:chatId", chat.getCurrent);
    app.patch("/chat/setType/:chatId", chat.setType);
}