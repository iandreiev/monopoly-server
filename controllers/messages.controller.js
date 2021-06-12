const ChatItem = require("../models/messages.model");

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const msg = new ChatItem({
        userID: req.body.userID,
        fromID: req.body.fromID,
        chatID: req.body.chatID,
        content: req.body.content,
        createdAt: req.body.createdAt,
        type: req.body.type
    });

    ChatItem.create(msg, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new user with method User."
        });
    else res.send(data);
    });

}

exports.findAll = (req, res) => {
    ChatItem.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    });
};

exports.getById = (req,res)=>{
    ChatItem.findById(req.params.chatId,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.chatId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.chatId
                });
            }
        } else res.send(data);
    })
}
exports.getChatById = (req,res)=>{
    ChatItem.findByChatId(
        req.params.chatId,
        (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.chatId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.chatId
                });
            }
        } else res.send(data);
    })
}

exports.countActiveMessages = (req,res) =>{
    ChatItem.countMessages(
        req.params.chatId,
        req.params.type,
        (err,data)=>{
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Project with id ${req.params.chatId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error while retrieving Project with id " + req.params.chatId
                    });
                }
            } else res.send(data);
        }
    )
}

exports.closeMessage = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    ChatItem.setClose(req.params.chatId, req.params.userId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.userId},  ${req.params.chatId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Project with id " + req.params.userId + " chatID: " + req.params.chatId
                });
            }
        } else res.send(data);
    })
}


//Change type from active to each other
exports.msgHide = (req,res) => {
    ChatItem.isActive(req.params.msgId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notif with id ${req.params.msgId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving notif with id " + req.params.msgId
                });
            }
        } else res.send(data);  
    })
}