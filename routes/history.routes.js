module.exports = app => {
    const history = require("../controllers/history.controller")

    app.post("/logs", history.create);
    app.post("/logs/setType/:historyId/:typeId", history.setType);

    app.get("/logs", history.findAll);
    app.get("/logs/:userId", history.getById);
    app.get("/logs/item/:historyId", history.getHiItemById);
}