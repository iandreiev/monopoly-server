

const SMS = require("../models/sms.model");

exports.send = (req,res) => {

    const sms = new SMS({
        id: req.body.id,
        phone: req.body.phone,
        code: req.body.code
    });

    SMS.send(sms, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new bid with method Bidding."
            });
        else res.send(data);
    })
}

exports.approve = (req,res) => {
    const sms = new SMS({
        id: req.body.id,
        phone: req.body.phone,
        code: req.body.code
    });
   SMS.approve  (
       sms,
    (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.body.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.body.id
                });
            }
        } else res.send(data);
    })
}