const sql = require("./db")

const table = "notifications"

/* 
Available statuses
0 - hidden
1 - visible
2 - warning
3 - danger
*/

const Notification = function(notif){
    this.type = notif.type;
    this.userId = notif.userId;
    this.content = notif.content;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.author = notif.author;
    this.authorId = notif.authorId;
    this.isShow = notif.isShow;
}

Notification.create = (newNotif, result) =>{
    sql.query(`INSERT INTO ${table} SET ?`, newNotif, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("New notification: ", {id: res.insertId, ...newNotif});
        result(null, {id: res.insertId, ...newNotif})
    })
}

Notification.remove = (id, res) => {
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted notification with id: ", id);
        result(null, res);
    })

}

Notification.isActive = (id, type, result) =>{
    sql.query(
        `UPDATE ${table} SET type = ? WHERE id = ?`,
        [type, id],
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
    
            console.log("updated notif: ", {id:  id, type: type});
            result(null, {id:id, type: type});
        }
    )
}

Notification.isShow = (id, result) =>{
    sql.query(`UPDATE ${table} SET isShow = 0 WHERE id = ?`, id, (err,res)=>{
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("hide notif: ", {id:  id});
        result(null, {id:id});
    })
}

Notification.getAll = result => {
    sql.query(`SELECT * FROM ${table}`, (err,res=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Notifications: ", res);
          result(null, res);  
    }))
}

Notification.getUserNotifications = (userId,result) =>{
    sql.query("SELECT * FROM `notifications` WHERE userId = ? ORDER BY `notifications`.`id` DESC", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found notifs: ", res);
            result(null, res);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null); 
    })
}

module.exports = Notification;