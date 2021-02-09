const Notification = require("../models/notifications.model")

// Create
exports.create = (req,res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const notif = new Notification({
        author: req.body.author,
        userId:  req.body.userId,
        content: req.body.content,
        type: req.body.type,
        authorId: req.body.authorId,
        isShow: req.body.isShow,
        createdAt: req.body.createdAt
    });

    Notification.create(notif, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new notif."
            });
        else res.send(data); 
    })
}

//Remvove
exports.delete = (req,res) => {
    Notification.remove(req.params.notifId,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notif with id ${req.params.notifId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete notif with id " + req.params.notifId
                });
            }
        } else res.send({ message: `Notif was deleted successfully!` });
    })
}

//Hide notification
exports.hide = (req,res) => {
    Notification.isShow(req.params.notifId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notif with id ${req.params.notifId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving notif with id " + req.params.notifId
                });
            }
        } else res.send(data);  
    })
}

//Change type from active to each other
exports.changeType = (req,res) => {
    Notification.isActive(req.params.notifId, req.params.type, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notif with id ${req.params.notifId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving notif with id " + req.params.notifId
                });
            }
        } else res.send(data);  
    })
}

//Get all notifications
exports.findAll = (req,res) => {
    Notification.getAll((err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving notifications"
        });
    else res.send(data);
    })
}

//Get notification by user ID
exports.getByUserId = (req,res) => {
    Notification.getUserNotifications(req.params.userId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found notifications with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving notifications with id " + req.params.userId
                });
            }
        } else res.send(data);
    })
}