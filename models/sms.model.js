const Nexmo = require("nexmo");
const sql = require("./db");

const SMS = function(sms){
    this.id = sms.id;
    this.phone = sms.phone;
    this.code = sms.code;
}

SMS.send = (newSMS, result) => {
    //Generator 
    let n = Math.floor(100000 + Math.random() * 900000);

    //Sender
    const nexmo = new Nexmo({
        apiKey: 'bcba68f8',
        apiSecret: 'dU2U0gtc1ZK6eCsl',
        debug: true
    });

    const sms = newSMS

    const from = 'Monopoly';
    const to = sms.phone;
    const text = `VERIFICATION CODE: ${n}`;

    console.log('Phone:',to)
    console.log('Generated code:',n)
    console.log('NewSMS:',sms)

    nexmo.message.sendSms(from,to,text, (err,response)=>{
        if(err){
            console.log(err)
        } else {
            if(response.messages[0]['status'] === "0"){
                console.log("SMS SUCCESSFULLY SENT");
            } else{
                console.log(`Message failed with error: ${response.messages[0]['error-text']}`);
            }
        }
        

    });

    let gen = n;

    let id = parseInt(sms.id)

    //DB queries (set code to DB)
    sql.query("UPDATE users SET code = ? WHERE id = ?",
    [gen, id],
    (err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
        }

        result(null, res);
        console.log(`Generate sms code: ${gen} and inserted to id ${id}`)
    })
}

SMS.approve = (sms, result) => {
    sql.query("SELECT code FROM users WHERE id = ?", 
    sms.id, 
    (err,res)=>{
        
        if(err){
            console.log(err);
            result(null,err);
            return;
        }

        if(res.length){         
            let smsCode = res[0].code;

            if(err){
                console.log(err)
                result(err,null);
                return; // На этом месте умер князь Игорь
            }

            if(sms.code == smsCode){
                sql.query("UPDATE users SET isPhoneVerified = 1 WHERE id = ?", sms.id, (err,res)=>{
                    if(err){
                        console.log(err)
                        result(null,err)
                        return
                    }
                    if (res.affectedRow == 0) {
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    console.log("Phone verified", {id:sms.id, kind:"ok"})
                    result(null, {kind: "ok"});
                    return;
                })
            }

            if(sms.code != smsCode){
                console.log("Not equal!")
                result({kind: "not_equal"},null)
                return;
            }
            
            return;
        }

        result({kind:"not_found"}, null);
    })

}

module.exports = SMS;
