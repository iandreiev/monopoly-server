const sql = require("./db.js");

const Setup = function (setup) {
    this.title = setup.title;
    this.phone_1 = setup.phone_1;
    this.phone_2 = setup.phone_2;
    this.description = setup.description;
    this.location = setup.location;
    this.address = setup.address;
    this.chatID = setup.chatID;
    this.companyTitle = setup.companyTitle;
    this.companyReq = setup.companyReq;
    this.companyId = setup.companyId;
    this.email = setup.email;
    this.wallet = setup.wallet;
}

Setup.create = (newSetup, result) => {

    sql.query("INSERT INTO websetup SET ?", newSetup, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("Setup item created: ", {id: res.insertId, ...newSetup});
        result(null, {id: res.insertId, ...newSetup});
    })
}

Setup.getAll = result =>{
    sql.query("SELECT * FROM websetup", (err,res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("setup: ", res);
          result(null, res);
    });
}

Setup.findById = (setupId, result) =>{
    sql.query("SELECT * FROM websetup WHERE id = ?", setupId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            result(null, res[0]);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
} 

Setup.updateById = (id, setup, result) => {
    sql.query("UPDATE websetup SET title = ?, phone_1 = ?, phone_2 = ?, description = ?, location = ?, address = ?, chatID = ?, companyTitle = ?, companyReq = ?, companyId = ?, email = ?, wallet = ? WHERE id = ?",
    [setup.title, setup.phone_1, setup.phone_2, setup.description, setup.location, setup.address, setup.chatID, setup.companyTitle, setup.companyReq, setup.companyId, setup.email,setup.wallet,id],
    (err,res) => {
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        result(null, {id:id, ...setup});
    }
    );
    
}

module.exports = Setup;
