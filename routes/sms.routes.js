module.exports = app => {
    const sms = require("../controllers/sms.controller");

    app.post("/sms/send", sms.send);
    app.post("/sms/approve", sms.approve)
}