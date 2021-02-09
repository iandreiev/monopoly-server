module.exports = app => {
    const mail = require("../controllers/mailer.controller");

    app.get("/mail/send/:type/:email", mail.send);
    app.get("/mail/approve/:email", mail.approve)

}