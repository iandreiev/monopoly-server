
const pay = require("../controllers/payment.controller")
module.exports = app => {
      app.post("/doTx", pay.create);
      app.get("/doTx", pay.findAll);
      app.patch("/doTx/setType/:txId/:typeId", pay.setType);
      app.get("/doTx/user/:userId", pay.findOne);
        app.post("/doTx/withdraw", pay.withdraw)
        app.get("/doTx/getInfo", pay.getInfo)
        app.get("/doTx/getRates", pay.getRates)
}



  // Create payment
  // - Create transaction with data from client
