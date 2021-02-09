const sql = require("./db")
const Wallet = function (wallet) {
        this.userID = wallet.userID;
        this.balance = wallet.balance;
        this.btcAddress = wallet.btcAddress;
}

Wallet.topUp = (userID, summ, result) => {
    sql.query("UPDATE wallet SET balance = balance+? WHERE userID = ?",
    [summ, userID],
    (err,res)=>{
       if(err){
           console.log(err)
           result(err,null)
           return
       }
       else{
        console.log('BALANCE', res)
        result(null,res)
        return
       }
    }
    )
}

Wallet.getAll = result => {
    sql.query("SELECT * FROM wallet", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("shop: ", res);
          result(null, res);
    });
};

Wallet.findById = (userId, result) => {
    sql.query("SELECT * FROM wallet WHERE userID = ?", userId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found user item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

Wallet.updateByID = (id, wallet, result) => {
    sql.query("UPDATE wallet SET balance = ? btcAddress ? WHERE userID = ?"),
    [wallet.balance, wallet.btcAddress, id],
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

        console.log("updated user: ", {id:  id, ...wallet});
        result(null, {id:id, ...wallet});
    }
}

let createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

Wallet.withdrawal = (userID, amount, btcAddress, type, result) => {
    sql.query("SELECT balance FROM wallet WHERE userID = ?", userID, (err,res)=>{
        let balance = res[0].balance 

        let formula = balance - amount

        sql.query("UPDATE wallet SET balance = ? WHERE userID = ?", [formula, userID], (err,res)=>{
            if(err){
                console.log(err)
            }

            console.log(res)
        })
    })
    sql.query("INSERT INTO transactions(userID, amount, btcAddress, createdAt, type) VALUES(userID = ?, amount = ?, btcAddress = ?, createdAt = ?,type = ?)", [userID, amount, btcAddress, createdAt, type], (err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
        }
        result(null, 200)
    
    })
}

module.exports = Wallet;
