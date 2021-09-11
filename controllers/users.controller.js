const User = require("../models/users.model.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        })
    }

    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        fathername: req.body.fathername,
        avatar: req.body.avatar,
        email: req.body.email,
        token: req.body.token,
        sex: req.body.sex,
        avatar: req.body.avatar,
        passport_1: req.body.passport_1,
        passport_2: req.body.passport_2,
        passport_3: req.body.passport_3,
        phone: req.body.phone,
        isVerified: req.body.isVerified,
        isPhoneVerified: req.body.isPhoneVerified,
        isEmailVerified: req.body.isEmailVerified,
        affiliate: req.body.affiliate,
        taxid: req.body.taxid,
        status: req.body.status,
        rating: req.body.rating,
        invested: req.body.invested,
        sharings: req.body.sharings,
        avgReturns: req.body.avgReturns,
        totalReturns: req.body.totalReturns,
        password: req.body.password,
        role: req.body.role
    })
    

    

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
}

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving users"
            })
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.params.userId
                })
            }
        } else res.send(data)
    })
}

exports.getUserById = (req,res) => {
    User.getUserId(req.params.userId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.params.userId
                })
            }
        } else res.send(data)
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
                    })
                }
            } else res.send(data)
        }
    )
}

exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                })
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.userId
                })
            }
        } else res.send({ message: `User was deleted successfully!` })
    })
}

// Get user projects (getUP)
exports.getUP = (req,res) => {
    User.getUserProjects(req.params.userId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.params.userId
                })
            }
        } else res.send(data)
    })
}

exports.setUserRole = (req, res) =>{
    User.setRole(req.params.userId, req.params.roleId, (err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error while retrieving user with id " + req.params.userId
                })
            }
        } else res.send(data)
    })
}

exports.loginPass = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        })
    }
    User.loginByPass(
        req.body.email,
        req.body.password,
        (err,data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}.`
                    })
                } else {
                    res.status(500).send({
                        message: "Error while retrieving user with id " + req.params.userId
                    })
                }
            } else res.send({
                userID: data.id,
                name: data.name,
                surname: data.surname,
                displayName: data.displayName,
                phone: data.phone,
                email: data.email,
                code: data.code,
                taxid: data.taxid,
                sex: data.sex,
                isVerified: data.isVerified,
                isPhoneVerified: data.isPhoneVerified,
                isEmailVerified: data.isEmailVerified,
                avatar: data.avatar,
                passport_1: data.passport_1,
                passport_2: data.passport_2,
                passport_3: data.passport_3,
                affiliate: data.affiliate,
                token: data.token,
                role: data.role,
                fathername: data.fathername,
                status: data.status,
                rating: data.rating,
                invested: data.invested,
                sharings: data.sharings,
                avgReturns: data.avgReturns,
                totalReturns: data.totalReturns,
                friend: data.friend,
                projectID: data.projectID,
                active: data.active,
                createdAt: data.createdAt,
                userfunded: data.userfunded,
                percentage: data.percentage,
                shareSize: data.shareSize,
                type: data.type
            })
        }
    )
}

exports.regPass = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        })
    }
    
    let uzer = new User({
        name: req.body.name,
        surname: req.body.surname,
        fathername: req.body.fathername,
        avatar: req.body.avatar,
        email: req.body.email,
        token: req.body.token,
        sex: req.body.sex,
        passport_1: req.body.passport_2,
        passport_2: req.body.passport_2,
        passport_3: req.body.passport_3,
        phone: req.body.phone,
        isVerified: req.body.isVerified,
        isPhoneVerified: req.body.isPhoneVerified,
        isEmailVerified: req.body.isEmailVerified,
        affiliate: req.body.affiliate,
        taxid: req.body.taxid,
        status: req.body.status,
        rating: req.body.rating,
        invested: req.body.invested,
        sharings: req.body.sharings,
        avgReturns: req.body.avgReturns,
        totalReturns: req.body.totalReturns,
        password: req.body.password
    })

    User.registerByPass(uzer, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
        

}


exports.setAvatar = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        })
    }

    User.loadAvatarById(req.body.avatar, req.params.userId, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
}

exports.setPassword = (req,res) => {
    User.setUserPassword(req.params.password, req.params.userId, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
}

exports.resetUserPassword = (req,res) => {
    User.resetPassword(req.params.password, req.params.email, (err,data)=>{
        
        console.log(`Object to update: ${req.params.password} ${req.params.email}`)
        
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
}

exports.setPassports = (req,res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannotbe empty!"
        })
    }
    
    User.loadPassportById(req.body.passport_1, req.body.passport_2, req.body.passport_3, req.params.userId, (err,data)=>{
        if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating a new user with method User."
        })
    else res.send(data)
    })


}

exports.setVerified = (req,res)=>{
    User.setVerified(req.params.id, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating a new user with method User."
            })
        else res.send(data)
    })
}