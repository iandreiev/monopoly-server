const Setup = require("../models/websetup.model");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const setup = new Setup({
        title: req.body.title,
    phone_1: req.body.phone_1,
    phone_2: req.body.phone_2,
    description: req.body.description,
    location: req.body.location,
    address: req.body.address,
    chatID: req.body.chatID,
    companyTitle: req.body.companyTitle,
    companyReq: req.body.companyReq,
    companyId: req.body.companyId,
    email: req.body.email,
    wallet: req.body.wallet
    })

    Setup.create(setup, (err,data) => {
        if(err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new user with method User."
    });
    else res.send(data);
    });
}

exports.findOne = (req,res) => {
    Setup.findById(req.params.setupId, (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found setup with id ${req.params.setupId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving setup with id " + req.params.setupId
                });
            }
        } else res.send(data);
    })
}

exports.update=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    Setup.updateById(
        req.params.setupId,
        new Setup(req.body),
        (err,data)=>{
          if(err){
              if(err.kind === "not_found"){
                  res.status(404).send({
                      message: `Not found Setup with id ${req.params.setupId}.`
                  });
              } else {
                  res.status(500).send({
                      message: "Error updating Setup with id " + req.params.setupId
                  });
              }
          } else res.send(data);
        }
    );
}

exports.findAll = (req,res) => {
    Setup.getAll((err,data)=>{
        if(err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving users"
        });
        else res.send(data);
    })
}