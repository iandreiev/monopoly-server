const Bid = require("../models/bidding.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const bid = new Bid({
        type_1: req.body.type_1,
        type_2: req.body.type_2,
        shareSize: req.body.shareSize,
        price: req.body.price,
        comment: req.body.comment,
        projectId: req.body.projectId,
        buyerId: req.body.buyerId,
        createdAt: req.body.createdAt,
    });

    Bid.create(bid, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new bid with method Bidding."
            });
        else res.send(data);
    });
}

exports.findByUserId = (req,res) => {
    Bid.findByUser(req.params.bidId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.bidId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.bidId
                });
            }
        } else res.send(data);
    })
}

exports.findOne = (req, res) => {
    Bid.findById(req.params.bidId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.bidId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.bidId
                });
            }
        } else res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Bid.updateById(
        req.params.bidId,
        new Bid(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Project with id ${req.params.bidId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Project with id " + req.params.bidId
                    });
                }
            } else res.send(data);
        }
    );
}

exports.findAll = (req, res) => {
    Bid.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Bid.remove(req.params.bidId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Bid with id ${req.params.bidId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Bid with id " + req.params.bidId
                });
            }
        } else res.send({ message: `Bid was deleted successfully!` });
    });
}

