module.exports = app => {
    const other = require("../controllers/other.controller");

    app.get("/btc", other.btc);
}