const Block = require('../models/pages.model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const block = new Block({
        page_id: req.body.page_id,
        title_title: req.body.title_title,
        title_title_en: req.body.title_title_en,
        title_title_ch: req.body.title_title_ch,
        title_type: req.body.title_type,
        title_align: req.body.title_align,
        content_type: req.body.content_type,
        content_text: req.body.content_text,
        content_text_en: req.body.content_text_en,
        content_text_ch: req.body.content_text_ch,
        content_align: req.body.content_align,
        media_type: req.body.media_type,
        media_content: req.body.media_content,
        cta_type: req.body.cta_type,
        cta_text: req.body.cta_text,
        cta_text_en: req.body.cta_text_en,
        cta_text_ch: req.body.cta_text_ch,
        cta_url: req.body.cta_url,
        meta_title: req.body.meta_title,
        meta_arrange: req.body.meta_arrange,
        meta_alias: req.body.meta_alias,
        meta_align: req.body.meta_align
    })

    Block.create(block, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new block."
        });
    else res.send(data);

    return
    })
}

exports.findOne = (req,res) => {
    Block.findById(req.params.id, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found page with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving page with id " + req.params.id
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

    Block.update(
        req.body.id,
        new Page(req.body),
        (err,data)=>{
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found page with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating page with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    )
}

exports.delete = (req, res) => {
    Block.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found page with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete page with id " + req.params.id
                });
            }
        } else res.send({ message: `Page was deleted successfully!` });
    });
}