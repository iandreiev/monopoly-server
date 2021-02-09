const Video = require("../models/videos.model")

/*

Types:
1 - YT
2 - Vimeo
3 - Firebase

*/

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }
    
    const video = new Video({
        id: req.body.id,
        title: req.body.title,
        caption:req.body.caption,
        projectID: req.body.projectID,
        type: req.body.type,
        file: req.body.file
    })

    Video.create(video, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating video."
            });
        else res.send(data);
    })
}

exports.getAll = (req,res)=>{
    Video.getAll((err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving videos"
            });
        else res.send(data);
    })
}

exports.getByPID = (req,res) =>{
    Video.getByPID(req.params.projectID, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving videos"
            });
        else res.send(data);
    })
}