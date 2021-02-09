const sql = require("./db.js");

const Bid = function (bid) {
    this.type_1 = bid.type_1;
    this.type_2 = bid.type_2;
    this.shareSize = bid.shareSize;
    this.price = bid.price;
    this.comment = bid.comment;
    this.projectId = bid.projectId;
    this.buyerId = bid.buyerId;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
}

//Create
Bid.create = (newBid, result) => {
    sql.query("INSERT INTO biddings SET ?", newBid, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("bid item created: ", {id: res.insertId, ...newBid});
        result(null, {id: res.insertId, ...newBid}); 
    })
}
//Update
Bid.updateById = (id, bid, result) => {
    sql.query("UPDATE biddings SET type_1 = ?, type_2 = ?,  buyerId = ?, projectId = ?, shareSize = ?, price = ?, comment = ?, createdAt = ? WHERE id = ?",
    [bid.type_1, bid.type_2, bid.buyerId, bid.projectId, bid.shareSize, bid.price, bid.comment, bid.createdAt,id],
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

        console.log("updated bid: ", {id:  id, ...bid});
        result(null, {id:id, ...bid});
    }
    );   
}

//Get all
Bid.getAll = result => {
    sql.query("SELECT * FROM biddings", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Bid: ", res);
          result(null, res);  
    })
}
// Get by id
Bid.findById = (bidId, result) => {
    sql.query("SELECT * FROM biddings WHERE id = ?", bidId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found bid item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found bid with the id
          result({ kind: "not_found" }, null);
    })
}

// Get by id
Bid.findByUser = (userId, result) => {
    sql.query("SELECT * FROM biddings WHERE userID = ?", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found bid item: ", res);
            result(null, res);
            return;
          }
      
          // not found bid with the id
          result({ kind: "not_found" }, null);
    })
}

// Remove
Bid.remove = (id, result) => {
    sql.query("DELETE FROM biddings WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted bid with id: ", id);
        result(null, res);
    });
  };



module.exports = Bid;