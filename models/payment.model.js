const sql = require("./db")
const Coinpayments = require("coinpayments")
const { number } = require("joi")

var options = {
    key: 'fe0a53535bb85a5305c0cb0695940c83b6357710b1a96a2961e81a637db735e6',
    secret: '0CC260cB0f19675eC4348A3cb0bC4194F4977321e6fcAd4306Dbc773ce1557Fd',
    autoIpn: true,
    ipnTime: false
}

var client = new Coinpayments(options)
/*
Payment types

Coinpayments: 101
VISA: 102
MC: 103

Conditions as proviso:
Enrollment: 200
Provided: 201
Canceled: 401

Types:

Returns: 777
*/

const Payment = function (pay) {
    this.userID = pay.userID;
    this.type = pay.type;
    this.amount = pay.amount;
    this.rate_btc = pay.rate_btc;
    this.projectID = pay.projectID;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.shareSize = pay.shareSize;
}


Payment.callbackURL = (result) => {

}

// Provide payment data to the system
Payment.create = (newPay, result) => {
    sql.query("INSERT INTO transactions SET ?", newPay, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("TX created: ", { id: res.insertId, ...newPay });
        result(null, { id: res.insertId, ...newPay });
    })
}

//Update status of current payment data
// Available statuses:
// - 0 - cancelled
// - 1 - success
// - 2 - pending
// - 7 - returns

Payment.updateType = (id, type, result) => {
    sql.query("UPDATE transactions SET type = ? WHERE id = ?", [type, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRow == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated project: ", { id: id, type: type });
        result(null, { id: id, type: type });
    })
}

// Get all transactions

Payment.getAll = result => {
    sql.query("SELECT * FROM transactions ORDER BY id DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Project: ", res);
        result(null, res);
    })
}

Payment.findById = (userId, result) => {
    sql.query("SELECT * FROM transactions WHERE userID = ?", userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found project item: ", res);
            result(null, res);
            return;
        }

        // not found project with the id
        result({ kind: "not_found" }, null);
    })
}

Payment.getClient = result => {
    client.getBasicInfo(function (err, res) {
        err ? console.log(err) :
            result(null, res)
    })
}

Payment.createTx = (
    currency1,
    currency2,
    amount,
    address,
    result
) => {
    client.createWithdrawal({
        
        

        function(err, res) {
            if (err) {
                console.log(err)
                result(null, err)
            } else {
                console.log(res)
                result(null, res)
            }
        }
    })
}

Payment.getRates = (currency, result) => {
    client.rates({
        'short': 1,
        'accepted': 1,
        function(err,res){
            err ? console.log(err) :
            result(null, res)
        }
    })
}

module.exports = Payment;