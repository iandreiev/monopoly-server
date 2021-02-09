const Payment = require("../models/payment.model")

exports.create = (req, res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const pay = new Payment({
        userID: req.body.userID,
        type: req.body.type,
        amount: req.body.amount,
        rate_btc: req.body.rate_btc,
        projectID: req.body.projectID,
        createdAt: req.body.createdAt,
        shareSize: req.body.shareSize
    })

    Payment.create(pay, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating Tx."
            });
        else res.send(data);
    })
}

exports.setType = (req,res) => {
    Payment.updateType(req.params.txId, req.params.typeId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.txId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.txId
                });
            }
        } else res.send(data);
    })
}

exports.findAll = (req,res) => {
    Payment.getAll((err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving transactions"
            });
        else res.send(data);
    })
}

exports.findOne = (req, res) => {
    Payment.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tx with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Tx with id " + req.params.userId
                });
            }
        } else res.send(data);
    })
}

exports.withdraw = (req,res) => {
    Payment.createTx(req.body.currency1, req.body.currency2, req.body.amount, req.body.address, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving transactions"
        });
        else res.send(data);
    })
}

exports.getInfo = (req,res) => {
    Payment.getClient((err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving transactions"
        });
    else res.send(data);
    })
}

exports.getRates = (req,res) => {
    Payment.getRates((err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving transactions"
        });
    else res.send(data);
    })
}