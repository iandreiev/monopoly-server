const Project = require("../models/projects.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const project = new Project({
        title: req.body.title,
        title_en: req.body.title_en,
        title_ch: req.body.title_ch,
        category: req.body.category,
        projectBrief: req.body.projectBrief,
        projectBrief_en: req.body.projectBrief_en,
        projectBrief_ch: req.body.projectBrief_ch,
        funded: req.body.funded,
        pledged: req.body.pledged,
        backers: req.body.backers,
        createdAt: req.body.createdAt,
        entrance: req.body.entrance,
        image: req.body.image,
        yield: req.body.yield,
        returns: req.body.returns,
        minimum: req.body.minimum,
        cost: req.body.cost,
        location: req.body.location,
        location_en: req.body.location_en,
        location_ch: req.body.location_ch,
        annual: req.body.annual
    });

    Project.create(project, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method Project."
            });
        else res.send(data);

        return
    });
}

exports.findOne = (req, res) => {
    Project.findById(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.projectId
                });
            }
        } else res.send(data);
    })
}

exports.getProjectsByCatId = (req,res) => {
    Project.getByCat(
        req.params.catId,
    (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.catId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Project with id " + req.params.catId
                });
            }
        } else res.send(data);
    }
    )
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Project.updateById(
        req.params.projectId,
        new Project(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Project with id ${req.params.projectId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Project with id " + req.params.projectId
                    });
                }
            } else res.send(data);
        }
    );
}

exports.findAll = (req, res) => {
    Project.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Project.remove(req.params.projectId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Project with id " + req.params.projectId
                });
            }
        } else res.send({ message: `Project was deleted successfully!` });
    });
}


exports.setType = (req,res) =>{
    Project.setType(req.body.type, req.params.projectId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not set mode to project with id " + req.params.projectId
                });
            }
        } else res.send({ message: `Project was updated successfully!` });
    })
}