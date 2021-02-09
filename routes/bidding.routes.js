module.exports = app =>{
    const bid = require("../controllers/bidding.controller");
    

    app.post("/bid", bid.create);
    app.get("/bid", bid.findAll);
    app.get("/bid/:bidId", bid.findOne);
    app.get("/users/bids/:bidId", bid.findByUserId);
    app.patch("/bid/:bidId", bid.update);
    app.delete("/bid/:bidId", bid.delete);
}