const sql = require("./db")
const nodemailer = require("nodemailer")
const xoauth2 = require("xoauth2")

const Mail = function (mail) {
    this.email = mail.email;
    this.name = mail.name;
    this.surname = mail.surname;
    this.id = mail.id;
    this.type = mail.type;
}

/* List of types
    1 - reset
    2 - confirm
    3 - all

*/

// Request email confirmation
Mail.send = (type, email, result) => {

    let address = email
    sql.query(`SELECT id, name, surname, email FROM users WHERE email = '${address}'`, (err, res) => {
        console.log(email)
        if (err) {
            console.log(err)
        }

        if (res.length) {
            
            var transport = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                auth: {
                    type: 'OAuth2',
                    user: 'andrv.dev@gmail.com',
                    clientId: '30567639654-6f3ss59aflqodbatq043ari19sg6innq.apps.googleusercontent.com',
                    clientSecret: 'mUb9EivP4freLSNHHVzcXf62',
                    refreshToken: '1//047JAnJBqtl-8CgYIARAAGAQSNwF-L9IrtH9fRuW4wakimjFRBxeKulJc6j9o-Ze9N5Qk1IJSJpLZ6Ju1vNV50Uv2Kbv1G8-juH8',
                    accessToken: 'ya29.a0AfH6SMCF_rrO6nwJrEBfOWjca5iIBnEtduUAsomwIbZu0GqHxcB0PxweYuSD-12fFzj1mHRcsxkpg7tyGyBzcTHbB9hmhxajgNKXZrAA5-Fuygfc1hKaeq8MNLH0P2L7sPqZ2RxqCT5Nm2ea4CZZ0jc3a3TZBeeef6EXutUQ_XE'
                },
                tls: {
                    rejectUnauthorized: false
                }

            });

            var n = Math.floor(100000 + Math.random() * 900000);

            var encode = Buffer.from(res[0].email).toString('base64')
            var testlink = `https://app.monopolylife.ru/emailVerification/${encode}`
            var resetLink = `https://app.monopolylife.ru/resetPassword/${encode}`
            var link = `https://app.monopolylife.ru/emailVerification/${encode}`

            var mailOptions = {
                from: 'no-reply@monopolyinfo.ru',
                to: res[0].email,
                subject: 'Monopoly account verification',
                text: `Verification link: ${testlink}`
            }

            var resetOptions = {
                from: 'no-reply@monopolyinfo.ru',
                to: res[0].email,
                subject: 'Monopoly account reset password',
                text: `Reset link: ${resetLink}`
            }

            if(type == "confirm"){
                transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                        result(err,null)
                        return
                    }
                    else {
                        console.log('Email Confirmation sent:' + info.response)
                        result(null,{ kind: "ok" })
                        return
                    }
                })
            } else if(type == "reset"){
                transport.sendMail(resetOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                        result(err,null)
                        return
                    }
                    else {
                        console.log('Email sent:' + info.response)
                        result(null,{ kind: "ok" })
                        return
                    }
                })
            } else {
                result(null,{kind:"unknown_type"})
            }
        }

        console.log(res)
        result(null, { kind: "ok" })
        return
    })
}

//Approve email
Mail.approve = (email, result) => {
    sql.query("UPDATE users SET isEmailVerified = 1 WHERE email = ?",
        email,
        (err,res) => {
            if(err){
                console.log(err)
                result(err,null);
                return;
            }
            else{
                console.log(res)
                result(null,{kind:"ok"})
                return;
            }
        }
    )
}

// Request reset password


module.exports = Mail;
