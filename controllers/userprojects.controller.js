const UserProject = require("../models/userprojects.model")

exports.buy = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const uProject = new UserProject({
        userID: req.body.userID,
        projectID: req.body.projectID,
        createdAt: req.body.createdAt,
        userfunded: req.body.userfunded,
        percentage: req.body.percentage,
        shareSize: req.body.shareSize,
        active: req.body.active,
        type: req.body.type
    });

    UserProject.buy(uProject, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while buying project."
            });
        else res.send(data);
    })

}


exports.increase = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        });
    }

    const uProject = new UserProject({
        userID: req.body.userID,
        projectID: req.body.projectID,
        userfunded: req.body.userfunded,
        shareSize: req.body.shareSize,
    });

    UserProject.increase(uProject, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while buying project."
            });
        else res.send(data);
    })

}

exports.getUserStat = (req, res) => {
    UserProject.getStats(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving stats."
            });
        else res.send(data);
    })
}

exports.getProjectsStat = (req, res) => {
    UserProject.getProjectStats((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving stats."
            });
        else res.send(data);
    })
}

exports.getTotalReturns = (req,res) =>{
    UserProject.getTotalReturns(req.params.userId, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving stats."
            });
        else res.send(data);
    })
}

exports.setActive = (req,res) => {
    UserProject.setActive(
        req.body.id,
        req.body.active,
        (err,data)=>{
            if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving stats."
            });
        else res.send(data);
        }
    )
}