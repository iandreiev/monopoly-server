const sql = require("./db.js");

const ChatItem = function (msg) {
    this.userID = msg.userID;
    this.fromID = msg.fromID;
    this.chatID = msg.chatID;
    this.content = msg.content;
    this.createdAt = msg.createdAt;
    this.type = msg.type;
}



ChatItem.create = (newMsg, result) =>{
    sql.query("INSERT INTO allMessages SET ?", newMsg, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("message: ", {id: res.insertId, ...newMsg});
        result(null, {id: res.insertId, ...newMsg}); 
    })
}

//Get all
ChatItem.getAll = result => {
    sql.query("SELECT * FROM allMessages", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Msg: ", res);
          result(null, res);  
    })
}



// // Get by id
// Message.findFromById = (bidId, result) => {
//     sql.query("SELECT * FROM allMessages WHERE fromID = ?", bidId, (err,res)=>{

      
        //   if (res.length) {
        //     console.log("found bid item: ", res[0]);
        //     result(null, res[0]);
        //     return;
        //   }
      
//           // not found bid with the id
//           result({ kind: "not_found" }, null);
//     })
// }

ChatItem.countMessages = (chatId, type, result) => {
    sql.query("SELECT COUNT(*) AS counter FROM allMessages WHERE userID = ? AND type = ?", [chatId, type], (err,res)=>{
        if (err) {
            result(err, null);
            return;
          }
      
          if (res) {
            console.log("found user item: ", res);
            result(null, {result: res[0].counter});
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

//Get by user id
ChatItem.findById = (chatId, result) => {
    sql.query("SELECT * FROM allMessages WHERE userID = ?", chatId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res) {
            console.log("found user item: ", res);
            result(null, res);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

//Get by user id and chat ID
ChatItem.findByChatId = (chatId, result) => {
    sql.query("SELECT * FROM `allMessages`  WHERE chatID = ? ORDER BY `allMessages`.`id` ASC", chatId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res) {
            console.log("found user item: ", res);
            result(null, res);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

// Set status
ChatItem.setClose = (chatId, userId, result) => {
    sql.query("UPDATE allMessages SET type = 0 WHERE userID = ? AND fromID = ?", chatId, userId, (err,res)=>{
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("msg closed!: ", {userID: chatId, fromID: userId});

        result(null, {userID: chatId, fromID: userId});
    })
}

ChatItem.isActive = (id, type, result) =>{
    sql.query(
        `UPDATE allMessages SET type = 0 WHERE id = ?`,
        id,
        (err,res)=>{
            if (err){
                console.log("error: ", err);
                result(null,err);
                return;
            }
    
            if(res.affectedRow == 0){
                result({kind: "not_found"}, null);
                return;
            }
    
            result(null, {id:id});
        }
    )
}


module.exports = ChatItem;



//UPDATE allMessages SET type = 0 WHERE userID = 77 AND fromID = 26