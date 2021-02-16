const Page = require('../models/builder.model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const page = new Page({
        alias: req.body.alias,
        title: req.body.title,
        title_en: req.body.title_en,
        title_ch: req.body.title_ch,
        meta: req.body.meta,
        meta_en: req.body.meta_en,
        meta_ch: req.body.meta_ch,
    })

    Page.create(page, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new page with method Project."
        });
    else res.send(data);

    return
    })
}

exports.findOne = (req,res) => {
    Page.findByAlias(req.params.alias, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found page with id ${req.params.alias}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving page with id " + req.params.alias
                });
            }
        } else res.send(data);
    })
}

exports.update = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Page.update(
        req.params.alias,
        new Page(req.body),
        (err,data)=>{
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found page with id ${req.params.alias}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating page with id " + req.params.alias
                    });
                }
            } else res.send(data);
        }
    )
}

exports.findAll = (req, res) => {
    Page.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving page"
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Project.remove(req.params.alias, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found page with id ${req.params.alias}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete page with id " + req.params.alias
                });
            }
        } else res.send({ message: `Page was deleted successfully!` });
    });
}