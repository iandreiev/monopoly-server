//Logging system activates while user buy a projects, make transactions, etc

const sql = require("./db")

const History = function(history){
    this.type = history.type;
    this.userID = history.userID;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.amount = history.amount;
    this.status = history.status;
    this.ip = history.ip;
    this.proviso = history.proviso; //Condition
    this.payment = history.payment;
    this.action = history.action;
}

History.create = (newHistory, result) =>{ 
    sql.query("INSERT INTO history SET ?", newHistory, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("History item created: ", {id: res.insertId, ...newHistory});
        result(null, {id: res.insertId, ...newHistory}); 
    })
}

History.getAll = result => {
    sql.query("SELECT * FROM history", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("history: ", res);
          result(null, res);  
    })
}

History.findById = (userId, result) =>{
    sql.query("SELECT * FROM history WHERE userID = ?", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found history item: ", res);
            result(null, res);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null);
    })
}

History.getItemById = (id, result) =>{
    sql.query("SELECT * FROM history WHERE id = ?", id, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found history item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null);
    })
}

History.updateType = (id, type, result) => {
    sql.query("UPDATE history SET type = ? WHERE id = ?", [type,id], (err,res)=>{
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated typein history: ", {id:  id, type: type});
        result(null, {id:id, type: type});
    })
}

module.exports = History;