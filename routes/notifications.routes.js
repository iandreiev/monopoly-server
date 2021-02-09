
module.exports = app => {
    const notif = require("../controllers/notifications.controller")

    //POST-queries
    app.post("/notifications", notif.create);

    //GET-queries
    app.get("/notifications",notif.findAll);
    app.get("/notifications/user/:userId",notif.getByUserId);

    //PATCH-queries
    app.patch("/notifications/hide/:notifId", notif.hide);
    app.patch("/notifications/:notifId/:type", notif.changeType);

    //DELETE-queries
    app.delete("/notifications/:notifId", notif.delete);

}