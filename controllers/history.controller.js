const History = require("../models/history.model")

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }
    const item = new History({
        userID: req.body.userID,
        type: req.body.type,
        createdAt: req.body.createdAt,
        amount: req.body.amount,
        ip: req.body.ip,
        proviso: req.body.proviso,
        payment: req.body.payment,
        status: req.body.status,
        action: req.body.action
    })

    History.create(item, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while logging history"
        });
    else res.send(data);
    })
}

exports.findAll = (req,res) =>{
    History.getAll((err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving logs"
        });
    else res.send(data);
    })
}

exports.getById = (req,res) => {
    History.findById(req.params.userId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found log with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving log with id " + req.params.userId
                });
            }
        } else res.send(data);
    })
}

exports.setType = (req,res) => {
    History.updateType(req.params.historyId, req.params.typeId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found log with id ${req.params.historyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while updating payment status with id " + req.params.historyId
                });
            }
        } else res.send(data);
    })
}

exports.getHiItemById = (req,res) => {
    History.getItemById(req.params.historyId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found log with id ${req.params.historyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving log with id " + req.params.historyId
                });
            }
        } else res.send(data);
    })
}