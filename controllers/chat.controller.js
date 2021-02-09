const NewChat = require("../models/chat.model");
const Chat = require("../models/chat.model")

exports.create = (req,res) =>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const chat = new Chat({
        userID: req.body.userID,
        chatTitle: req.body.chatTitle,
        address: req.body.address,
        createdAt: req.body.createdAt,
        type: req.body.type,
    })

    Chat.create(chat, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new chat"
        });
    else res.send(data);
    })
}

exports.findAll = (req, res) => {
    Chat.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Chat.findById(req.params.chatId, (err, data) => {
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

exports.setType = (req,res) => {
  Chat.updateType(
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
    }
  )
}

exports.getCurrent = (req,res) =>{ 
Chat.getCurrentChat(
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
    }
)
}

