const Wallet = require("../models/wallet.model")

exports.findAll = (req, res) => {
    Wallet.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    });
};

exports.topUpBalance = (req,res) => {
    Wallet.topUp(req.params.userID, req.body.summ, (err,data)=>{
        if(err){
            res.status(500).send({
                message: 'internal_error'
            })
        }
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Wallet.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Wallet.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
}

exports.withdrawal = (req,res) =>[
      Wallet.withdrawal(
        req.body.userID,
        req.body.amount,
        req.body.btcAddress,
        req.body.type,
        (err,data)=>{
            if(err){
                res.status(500)({
                    message: "Error while creation new ticket"
                })
            }
            else res.send(data)
        }
    )
]