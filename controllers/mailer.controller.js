const Mail = require("../models/mailer.model")

exports.send = (req,res)=>{
    Mail.send(
        req.params.type,req.params.email, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while sending mail"
            });
        else res.send(data);
    })
    
}

exports.approve = (req,res) =>{
    Mail.approve(req.params.email, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
}
