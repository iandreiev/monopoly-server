const Slider = require('../models/slider.model')

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const slider = new Slider({
        name: req.body.name,
        title: req.body.title,
        title_en: req.body.title_en,
        title_ch: req.body.title_ch,
        subtitle: req.body.subtitle,
        subtitle_en: req.body.subtitle_en,
        subtitle_ch: req.body.subtitle_ch,
        media: req.body.media,
        url: req.body.url,
        arrange: req.body.arrange
    })

    Slider.create(slider, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while create slide."
            });
        else res.send(data);
    })
}

exports.getAll = (req,res) => {
    Slider.getAll((err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving slides"
        });
    else res.send(data);
    })
}

exports.updateById = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Slider.update(
        req.params.id,
        new Slider(req.body),
        (err,data)=>{
            if (err) {
                if (err.kind === "not_found") {
                    res.sta> tus(404).send({
                        message: `Not found slider with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating slider with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
}

exports.delete = (req,res) => {
    Slider.remove(req.params.id, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found slider with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete slider with id " + req.params.id
                });
            }
        } else res.send({ message: `Slider was deleted successfully!` });
    })
}

exports.getById = (req, res) => {
    Slider.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found slider with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving slider with id " + req.params.id
                });
            }
        } else res.send(data);
    })
}