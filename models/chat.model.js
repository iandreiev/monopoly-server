const sql = require("./db")

const NewChat = function(chat){
    this.userID = chat.userID;
    this.address = chat.address;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.chatTitle = chat.chatTitle;
    this.type = chat.type;
}

NewChat.create = (newChat, result)=>{
    sql.query("INSERT INTO allChats SET ?", newChat, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("message: ", {id: res.insertId, ...newChat});
        result(null, {id: res.insertId, ...newChat}); 
    })
}

NewChat.getAll = result => {
    sql.query("SELECT * FROM allChats", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Msg: ", res);
          result(null, res);  
    })
}

NewChat.findById = (chatId, result) => {
    sql.query("SELECT * FROM allChats WHERE userID = ?", chatId, (err,res)=>{
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

NewChat.getByAddress = (address, result) => {
    sql.query("SELECT * FROM allChats WHERE address = ?", address,(err,res)=>{
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

NewChat.getCurrentChat = (chatId, result) => {
    sql.query("SELECT * FROM allChats WHERE id = ?", chatId, (err,res)=>{
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

NewChat.updateType = (chatId, result) => {
    sql.query("UPDATE allChats SET type = 2 WHERE id = ?", chatId, (err,res)=>{
        
            if (err){
                console.log("error: ", err);
                result(null,err);
                return;
            }
    
            if(res.affectedRow == 0){
                result({kind: "not_found"}, null);
                return;
            }
    
            console.log("updated type in chat: ", {chatID:chatId});
            result(null, {chatID:chatId});
        })
}

module.exports = NewChat;
