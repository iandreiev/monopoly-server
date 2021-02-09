module.exports = app =>{
    const setup = require("../controllers/websetup.controller");
    

    app.post("/setup", setup.create);
    app.get("/setup", setup.findAll);
    app.get("/setup/:setupId", setup.findOne);
    app.patch("/setup/:setupId", setup.update);
}