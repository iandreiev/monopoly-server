const Category = require("../models/categories.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const category = new Category({
        title: req.body.title,
        title_en: req.body.title_en,
        title_ch: req.body.title_ch,
        alias: req.body.alias
    });

    Category.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method category."
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving category with id " + req.params.categoryId
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

    Category.updateById(
        req.params.categoryId,
        new Category({
            title: req.body.title,
            title_en: req.body.title_en,
            title_ch: req.body.title_ch,
            alias: req.body.alias,
        }),
        (err, data) => {
            console.log(data)
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found category with id ${req.params.categoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating category with id " + req.params.categoryId
                    });
                }
            } else res.send(data);
        }
    );
}

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Category.remove(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete category with id " + req.params.categoryId
                });
            }
        } else res.send({ message: `category was deleted successfully!` });
    });
}
